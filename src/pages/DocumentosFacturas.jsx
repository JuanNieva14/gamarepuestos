import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Spinner,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { obtenerFacturas, obtenerDetalleFactura } from "../services/documentos_facturas";

export default function DocumentosFacturas() {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detalle, setDetalle] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [facturaActual, setFacturaActual] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;

  // 🔄 Cargar lista de facturas
  const cargarFacturas = async () => {
    setLoading(true);
    try {
      const data = await obtenerFacturas();
      setFacturas(data);
    } catch (error) {
      alert("Error al cargar facturas: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarFacturas();
  }, []);

  // 🔍 Filtro en vivo
  const facturasFiltradas = facturas.filter((f) => {
    const texto = `${f.cliente ?? ""} ${f.documento_cliente ?? ""} ${f.numero_factura ?? ""}`.toLowerCase();
    return texto.includes(busqueda.toLowerCase());
  });

  // 🔢 Paginación
  const totalPaginas = Math.ceil(facturasFiltradas.length / registrosPorPagina);
  const inicio = (paginaActual - 1) * registrosPorPagina;
  const fin = inicio + registrosPorPagina;
  const facturasPaginadas = facturasFiltradas.slice(inicio, fin);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  // 🧾 Ver detalle de factura
  const verFactura = async (factura) => {
    try {
      const data = await obtenerDetalleFactura(factura.id_factura);
      setDetalle(data);
      setFacturaActual({
        ...factura,
        correo_cliente: data[0]?.correo_cliente,
        forma_pago: data[0]?.forma_pago,
        estado: data[0]?.estado,
        vendedor: data[0]?.vendedor,
        usuario_vendedor: data[0]?.usuario_vendedor,
      });
      setShowModal(true);
    } catch (error) {
      alert("Error al obtener detalle: " + error.message);
    }
  };

  // 🖨️ Imprimir factura
  const handlePrint = () => {
    const contenido = document.getElementById("recibo-factura").innerHTML;
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Factura ${facturaActual.numero_factura}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2, h4 { text-align: center; }
            p { margin: 4px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>${contenido}</body>
      </html>
    `);
    ventana.document.close();
    ventana.print();
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Documentos - Facturas</h2>

        {/* 🔍 Barra de búsqueda */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre, apellido o número de cliente..."
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPaginaActual(1);
              }}
            />
          </Col>
          <Col md={6} className="text-md-end text-muted mt-2 mt-md-0">
            Mostrando {facturasPaginadas.length} de {facturasFiltradas.length} resultados
          </Col>
        </Row>

        {/* 📋 Tabla */}
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <>
            <Table striped bordered hover variant="dark" responsive className="text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Número Factura</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Documento</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {facturasPaginadas.length > 0 ? (
                  facturasPaginadas.map((f, i) => (
                    <tr key={f.id_factura}>
                      <td>{inicio + i + 1}</td>
                      <td>{f.numero_factura}</td>
                      <td>{f.fecha_factura}</td>
                      <td>{f.cliente}</td>
                      <td>{f.documento_cliente}</td>
                      <td>{f.estado}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => verFactura(f)}
                        >
                          🖨️ Imprimir
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-muted">
                      No se encontraron facturas.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* 🔄 Paginación */}
            {totalPaginas > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => cambiarPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                >
                  ⬅️ Anterior
                </Button>
                <span className="fw-bold">
                  Página {paginaActual} / {totalPaginas}
                </span>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => cambiarPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                >
                  Siguiente ➡️
                </Button>
              </div>
            )}
          </>
        )}
      </Card>

      {/* 🧾 Modal de impresión */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Factura #{facturaActual?.numero_factura}</Modal.Title>
        </Modal.Header>
        <Modal.Body id="recibo-factura">
          {facturaActual && (
            <>
              <h4 className="text-center">Gama Repuestos Quibdó</h4>
              <p><strong>Factura electrónica a:</strong> {facturaActual.correo_cliente}</p>
              <p>
                <strong>Emitida por:</strong> {facturaActual.vendedor} ({facturaActual.usuario_vendedor})
              </p>
              <p><strong>Forma de pago:</strong> {facturaActual.forma_pago}</p>
              <p><strong>Estado:</strong> {facturaActual.estado}</p>
              <p><strong>Cliente:</strong> {facturaActual.cliente}</p>
              <p><strong>Documento:</strong> {facturaActual.documento_cliente}</p>
              <p><strong>Fecha:</strong> {facturaActual.fecha_factura}</p>

              <Table striped bordered hover size="sm" className="text-center mt-3">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {detalle.map((d, idx) => (
                    <tr key={idx}>
                      <td>{d.producto}</td>
                      <td>{d.cantidad}</td>
                      <td>{d.precio_unitario}</td>
                      <td>{d.subtotal}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="3"><strong>Total:</strong></td>
                    <td><strong>{detalle[0]?.total_factura}</strong></td>
                  </tr>
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={handlePrint}>
            🖨️ Imprimir
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
