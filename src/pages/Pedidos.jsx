import React, { useState } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Row,
  Col,
  InputGroup,
  Badge,
} from "react-bootstrap";

export default function PedidosProveedores() {
  // 🧾 Datos simulados
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      proveedor: "Motos del Norte S.A.S",
      producto: "Baterías 12V",
      cantidad: 20,
      valorTotal: 1500000,
      fecha: "2025-10-15",
      estado: "En Pedido",
    },
    {
      id: 2,
      proveedor: "Lubricantes Colmoto",
      producto: "Aceite 20W50",
      cantidad: 50,
      valorTotal: 2500000,
      fecha: "2025-09-30",
      estado: "Recibido",
    },
    {
      id: 3,
      proveedor: "Repuestos Quimbaya",
      producto: "Pastillas de freno",
      cantidad: 100,
      valorTotal: 3000000,
      fecha: "2025-09-01",
      estado: "Cancelado",
    },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [formData, setFormData] = useState({
    proveedor: "",
    producto: "",
    cantidad: "",
    valorTotal: "",
    fecha: "",
    estado: "En Pedido",
  });
  const [editando, setEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  // 🔍 Filtrado
  const filtrados = pedidos.filter(
    (p) =>
      p.proveedor.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.estado.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 💬 Mostrar mensaje
  const showMsg = (text, ms = 2500) => {
    setMensaje(text);
    setTimeout(() => setMensaje(null), ms);
  };

  // ✏️ Cambiar campos
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 💾 Guardar
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === editando.id ? { ...p, ...formData } : p
        )
      );
      showMsg("✅ Pedido actualizado correctamente.");
    } else {
      const nuevo = { id: Date.now(), ...formData };
      setPedidos([...pedidos, nuevo]);
      showMsg("✅ Pedido agregado correctamente.");
    }
    setMostrarModal(false);
    setEditando(null);
    setFormData({
      proveedor: "",
      producto: "",
      cantidad: "",
      valorTotal: "",
      fecha: "",
      estado: "En Pedido",
    });
  };

  // 🗑️ Eliminar
  const handleDelete = (id) => {
    setPedidos(pedidos.filter((p) => p.id !== id));
    showMsg("🗑️ Pedido eliminado correctamente.");
  };

  // ✏️ Editar
  const handleEdit = (pedido) => {
    setEditando(pedido);
    setFormData({ ...pedido });
    setMostrarModal(true);
  };

  // 🧾 Generar comprobante
  const handleComprobante = (pedido) => {
    alert(
      `📄 Generando comprobante de pedido #${pedido.id}\nProveedor: ${pedido.proveedor}\nProducto: ${pedido.producto}\nValor Total: $${pedido.valorTotal.toLocaleString()}`
    );
  };

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">Pedidos a Proveedores</h2>

        {/* 🔔 Mensajes */}
        {mensaje && (
          <Alert
            variant={
              mensaje.startsWith("✅")
                ? "success"
                : mensaje.startsWith("🗑️")
                ? "warning"
                : "danger"
            }
            className="text-center"
          >
            {mensaje}
          </Alert>
        )}

        {/* 🔍 Buscador */}
        <Row className="mb-3">
          <Col md={6}>
            <InputGroup>
              <Form.Control
                placeholder="Buscar por proveedor, producto o estado..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <Button
                variant="outline-danger"
                onClick={() => setBusqueda("")}
              >
                ✖ Limpiar
              </Button>
            </InputGroup>
          </Col>
          <Col md={3} className="text-end">
            <Button variant="danger" onClick={() => setMostrarModal(true)}>
              ➕ Nuevo Pedido
            </Button>
          </Col>
        </Row>

        {/* 📋 Tabla */}
        <Table striped bordered hover variant="dark" className="text-center align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Proveedor</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Valor Total</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan={8}>No hay pedidos registrados.</td>
              </tr>
            ) : (
              filtrados.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.proveedor}</td>
                  <td>{p.producto}</td>
                  <td>{p.cantidad}</td>
                  <td>${p.valorTotal.toLocaleString()}</td>
                  <td>{p.fecha}</td>
                  <td>
                    <Badge
                      bg={
                        p.estado === "En Pedido"
                          ? "warning"
                          : p.estado === "Recibido"
                          ? "success"
                          : "danger"
                      }
                    >
                      {p.estado}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-info"
                      className="me-2"
                      onClick={() => handleComprobante(p)}
                    >
                      📄 Comprobante
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-warning"
                      className="me-2"
                      onClick={() => handleEdit(p)}
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDelete(p.id)}
                    >
                      🗑️ Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      {/* 🟡 Modal */}
      <Modal
        show={mostrarModal}
        onHide={() => setMostrarModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>
            {editando ? "Editar Pedido" : "Agregar Pedido"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-dark text-light">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Proveedor</Form.Label>
              <Form.Control
                type="text"
                name="proveedor"
                value={formData.proveedor}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Producto</Form.Label>
                  <Form.Control
                    type="text"
                    name="producto"
                    value={formData.producto}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Valor Total</Form.Label>
                  <Form.Control
                    type="number"
                    name="valorTotal"
                    value={formData.valorTotal}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                  >
                    <option value="En Pedido">En Pedido</option>
                    <option value="Recibido">Recibido</option>
                    <option value="Cancelado">Cancelado</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            {editando ? "Guardar cambios" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
