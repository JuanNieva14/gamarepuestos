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
  obtenerPedidosProveedores,
  obtenerDetallePedido,
} from "../services/pedidosproveedores";

export default function DocumentosPedidosProveedores() {
  const [pedidos, setPedidos] = useState([]);
  const [detalle, setDetalle] = useState([]);
  const [pedidoActual, setPedidoActual] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;
  const [loading, setLoading] = useState(false);

  // 🔄 Cargar pedidos
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await obtenerPedidosProveedores();
        setPedidos(data);
      } catch (error) {
        alert("Error al cargar pedidos: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔍 Filtro en vivo
  const pedidosFiltrados = pedidos.filter((p) => {
    const texto = `${p.proveedor ?? ""} ${p.nit_proveedor ?? ""} ${
      p.usuario ?? ""
    }`.toLowerCase();
    return texto.includes(busqueda.toLowerCase());
  });

  // 🔢 Paginación
  const totalPaginas = Math.ceil(pedidosFiltrados.length / registrosPorPagina);
  const inicio = (paginaActual - 1) * registrosPorPagina;
  const fin = inicio + registrosPorPagina;
  const pedidosPaginados = pedidosFiltrados.slice(inicio, fin);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  // 🧾 Ver detalle
  const verPedido = async (pedido) => {
    try {
      const data = await obtenerDetallePedido(pedido.id_pedido);
      setDetalle(data);
      setPedidoActual({
        ...pedido,
        estado: data[0]?.estado,
        fecha_pedido: data[0]?.fecha_pedido,
        fecha_entrega: data[0]?.fecha_entrega,
        observaciones: data[0]?.observaciones,
      });
      setShowModal(true);
    } catch (error) {
      alert("Error al obtener detalle: " + error.message);
    }
  };

  // 🖨️ Imprimir pedido
  const handlePrint = () => {
    const contenido = document.getElementById("recibo-pedido").innerHTML;
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Pedido ${pedidoActual.numero_pedido}</title>
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
        <h2 className="text-center text-danger mb-4">
          Documentos – Pedidos a Proveedores
        </h2>

        {/* 🔍 Barra de búsqueda */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Buscar por proveedor, NIT o usuario..."
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPaginaActual(1);
              }}
            />
          </Col>
          <Col md={6} className="text-md-end text-muted mt-2 mt-md-0">
            Mostrando {pedidosPaginados.length} de {pedidosFiltrados.length} resultados
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
                  <th>Proveedor</th>
                  <th>NIT</th>
                  <th>Estado</th>
                  <th>Fecha Pedido</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {pedidosPaginados.length > 0 ? (
                  pedidosPaginados.map((p, i) => (
                    <tr key={p.id_pedido}>
                      <td>{inicio + i + 1}</td>
                      <td>{p.numero_pedido}</td>
                      <td>{p.proveedor}</td>
                      <td>{p.nit_proveedor}</td>
                      <td>{p.estado}</td>
                      <td>{p.fecha_pedido}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => verPedido(p)}
                        >
                          🖨️ Imprimir
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-muted">
                      No se encontraron pedidos.
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
          <Modal.Title>Pedido #{pedidoActual?.numero_pedido}</Modal.Title>
        </Modal.Header>
        <Modal.Body id="recibo-pedido">
          {pedidoActual && (
            <>
              <h4 className="text-center">Gama Repuestos Quibdó</h4>
              <p><strong>Proveedor:</strong> {pedidoActual.proveedor}</p>
              <p><strong>NIT:</strong> {pedidoActual.nit_proveedor}</p>
              <p><strong>Registrado por:</strong> {pedidoActual.usuario}</p>
              <p><strong>Estado:</strong> {pedidoActual.estado}</p>
              <p><strong>Fecha Pedido:</strong> {pedidoActual.fecha_pedido}</p>
              <p><strong>Fecha Entrega Esperada:</strong> {pedidoActual.fecha_entrega}</p>
              <p><strong>Observaciones:</strong> {pedidoActual.observaciones}</p>

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
                    <td><strong>{detalle[0]?.total_general}</strong></td>
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
