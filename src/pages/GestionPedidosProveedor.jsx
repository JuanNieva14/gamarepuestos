import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Table,
  InputGroup,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";
import {
  obtenerPedidos,
  crearPedido,
  editarPedido,
  eliminarPedido,
} from "../services/gestion_pedidos_proveedoresService";

export default function PedidosProveedores() {
  const [pedidos, setPedidos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtrados, setFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [tipoMsg, setTipoMsg] = useState("success");
  const [mostrarModal, setMostrarModal] = useState(false);

  const [formPedido, setFormPedido] = useState({
    numero_pedido: "",
    id_proveedor: "",
    id_usuario: "",
    id_estado: "",
    fecha_pedido: "",
    fecha_entrega_esperada: "",
    total: "",
    observaciones: "",
  });

  const showMsg = (texto, tipo = "success", ms = 2500) => {
    setMensaje(texto);
    setTipoMsg(tipo);
    setTimeout(() => setMensaje(null), ms);
  };

  // 🔹 Cargar pedidos
  const listarPedidos = async () => {
    try {
      setLoading(true);
      const res = await obtenerPedidos();
      if (res.success) {
        setPedidos(res.data);
        setFiltrados(res.data);
      }
    } catch (error) {
      console.error("❌ Error al listar pedidos:", error);
      showMsg("Error al cargar pedidos", "danger");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Búsqueda en vivo
  const handleBuscar = (valor) => {
    setBusqueda(valor);
    const texto = valor.toLowerCase();
    const filtrados = pedidos.filter(
      (p) =>
        p.proveedor?.toLowerCase().includes(texto) ||
        p.estado?.toLowerCase().includes(texto) ||
        p.numero_pedido?.toLowerCase().includes(texto)
    );
    setFiltrados(filtrados);
  };

  // 🔹 Crear nuevo pedido
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearPedido(formPedido);
      showMsg("Pedido registrado correctamente");
      setMostrarModal(false);
      listarPedidos();
    } catch (error) {
      console.error(error);
      showMsg("Error al registrar pedido", "danger");
    }
  };

  useEffect(() => {
    listarPedidos();
  }, []);

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">
          Gestión de Pedidos a Proveedores
        </h2>

        {mensaje && (
          <Alert variant={tipoMsg} className="fw-bold text-center">
            {mensaje}
          </Alert>
        )}

        {/* 🔍 Búsqueda y botón */}
        <Row className="mb-4">
          <Col md={9}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar por proveedor, estado o número..."
                value={busqueda}
                onChange={(e) => handleBuscar(e.target.value)}
                className="bg-dark text-light border-danger"
              />
              <Button
                variant="outline-danger"
                onClick={() => {
                  setBusqueda("");
                  setFiltrados(pedidos);
                }}
              >
                Limpiar
              </Button>
            </InputGroup>
          </Col>
          <Col md={3} className="text-end">
            <Button
              variant="danger"
              className="fw-bold"
              onClick={() => setMostrarModal(true)}
            >
              + Registrar Pedido
            </Button>
          </Col>
        </Row>

        {/* 🧾 Tabla de pedidos */}
        <div className="table-responsive">
          <Table striped bordered hover variant="dark" className="text-center align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Proveedor</th>
                <th>Vendedor</th>
                <th>Estado</th>
                <th>Fecha Pedido</th>
                <th>Entrega</th>
                <th>Total</th>
                <th>Observación</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8}>
                    <Spinner animation="border" variant="light" />
                  </td>
                </tr>
              ) : filtrados.length > 0 ? (
                filtrados.map((p) => (
                  <tr key={p.id_pedido}>
                    <td>{p.id_pedido}</td>
                    <td>{p.proveedor || "-"}</td>
                    <td>{p.vendedor || "-"}</td>
                    <td>
                      <span
                        className={`badge ${
                          p.estado?.toLowerCase() === "entregado"
                            ? "bg-success"
                            : p.estado?.toLowerCase() === "pendiente"
                            ? "bg-warning text-dark"
                            : "bg-secondary"
                        }`}
                      >
                        {p.estado || "-"}
                      </span>
                    </td>
                    <td>{p.fecha_pedido || "-"}</td>
                    <td>{p.entrega || "-"}</td>
                    <td>${Number(p.total || 0).toLocaleString()}</td>
                    <td>{p.observaciones || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>No hay pedidos registrados</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* 🧮 Modal de registro */}
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>Registrar Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Número de Pedido</Form.Label>
              <Form.Control
                type="text"
                value={formPedido.numero_pedido}
                onChange={(e) =>
                  setFormPedido({ ...formPedido, numero_pedido: e.target.value })
                }
                className="bg-dark text-light border-danger"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de Pedido</Form.Label>
              <Form.Control
                type="date"
                value={formPedido.fecha_pedido}
                onChange={(e) =>
                  setFormPedido({ ...formPedido, fecha_pedido: e.target.value })
                }
                className="bg-dark text-light border-danger"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de Entrega Esperada</Form.Label>
              <Form.Control
                type="date"
                value={formPedido.fecha_entrega_esperada}
                onChange={(e) =>
                  setFormPedido({
                    ...formPedido,
                    fecha_entrega_esperada: e.target.value,
                  })
                }
                className="bg-dark text-light border-danger"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="number"
                value={formPedido.total}
                onChange={(e) =>
                  setFormPedido({ ...formPedido, total: e.target.value })
                }
                className="bg-dark text-light border-danger"
                placeholder="Ej. 150000"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formPedido.observaciones}
                onChange={(e) =>
                  setFormPedido({
                    ...formPedido,
                    observaciones: e.target.value,
                  })
                }
                className="bg-dark text-light border-danger"
              />
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant="danger" className="fw-bold px-4">
                Guardar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
