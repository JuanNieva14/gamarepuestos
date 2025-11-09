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
import {
  obtenerCotizaciones,
  obtenerDetalleCotizacion,
} from "../services/documento_cotizaciones";

export default function ConsultaCotizacion() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [detalle, setDetalle] = useState([]);
  const [cotizacionActual, setCotizacionActual] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;
  const [loading, setLoading] = useState(false);

  // 🔄 Cargar cotizaciones
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await obtenerCotizaciones();
        setCotizaciones(data);
      } catch (error) {
        alert("Error al cargar cotizaciones: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔍 Filtro en vivo
  const cotizacionesFiltradas = cotizaciones.filter((c) => {
    const texto = `${c.cliente ?? ""} ${c.documento_cliente ?? ""} ${
      c.numero_cotizacion ?? ""
    }`.toLowerCase();
    return texto.includes(busqueda.toLowerCase());
  });

  // 🔢 Paginación
  const totalPaginas = Math.ceil(cotizacionesFiltradas.length / registrosPorPagina);
  const inicio = (paginaActual - 1) * registrosPorPagina;
  const fin = inicio + registrosPorPagina;
  const cotizacionesPaginadas = cotizacionesFiltradas.slice(inicio, fin);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  // 🧾 Ver detalle
  const verCotizacion = async (cotizacion) => {
    try {
      const data = await obtenerDetalleCotizacion(cotizacion.id_cotizacion);
      setDetalle(data);
      setCotizacionActual({
        ...cotizacion,
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

  // 🖨️ Imprimir cotización
  const handlePrint = () => {
    const contenido = document.getElementById("recibo-cotizacion").innerHTML;
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Cotización ${cotizacionActual.numero_cotizacion}</title>
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
        <h2 className="text-center text-danger mb-4">Consulta de Cotizaciones</h2>

        {/* 🔍 Barra de búsqueda */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre, apellido o documento..."
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPaginaActual(1);
              }}
            />
          </Col>
          <Col md={6} className="text-md-end text-muted mt-2 mt-md-0">
            Mostrando {cotizacionesPaginadas.length} de {cotizacionesFiltradas.length} resultados
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
                  <th>Número</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Documento</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {cotizacionesPaginadas.length > 0 ? (
                  cotizacionesPaginadas.map((c, i) => (
                    <tr key={c.id_cotizacion}>
                      <td>{inicio + i + 1}</td>
                      <td>{c.numero_cotizacion}</td>
                      <td>{c.fecha_cotizacion}</td>
                      <td>{c.cliente}</td>
                      <td>{c.documento_cliente}</td>
                      <td>{c.estado}</td>
                      <td>
                       
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-muted">
                      No se encontraron cotizaciones.
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
          <Modal.Title>Cotización #{cotizacionActual?.numero_cotizacion}</Modal.Title>
        </Modal.Header>
        <Modal.Body id="recibo-cotizacion">
          {cotizacionActual && (
            <>
              <h4 className="text-center">Gama Repuestos Quibdó</h4>
              <p><strong>Cotización enviada a:</strong> {cotizacionActual.correo_cliente}</p>
              <p>
                <strong>Elaborada por:</strong> {cotizacionActual.vendedor} ({cotizacionActual.usuario_vendedor})
              </p>
              <p><strong>Forma de pago:</strong> {cotizacionActual.forma_pago}</p>
              <p><strong>Estado:</strong> {cotizacionActual.estado}</p>
              <p><strong>Cliente:</strong> {cotizacionActual.cliente}</p>
              <p><strong>Documento:</strong> {cotizacionActual.documento_cliente}</p>
              <p><strong>Fecha:</strong> {cotizacionActual.fecha_cotizacion}</p>

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
                    <td colSpan="3"><strong>Subtotal:</strong></td>
                    <td><strong>{detalle[0]?.subtotal_general}</strong></td>
                  </tr>
                  <tr>
                    <td colSpan="3"><strong>IVA:</strong></td>
                    <td><strong>{detalle[0]?.iva}</strong></td>
                  </tr>
                  <tr>
                    <td colSpan="3"><strong>Descuento:</strong></td>
                    <td><strong>{detalle[0]?.descuento}</strong></td>
                  </tr>
                  <tr>
                    <td colSpan="3"><strong>Total:</strong></td>
                    <td><strong>{detalle[0]?.total_general}</strong></td>
                  </tr>
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
