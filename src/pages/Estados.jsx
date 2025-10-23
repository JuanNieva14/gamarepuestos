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
  Badge,
} from "react-bootstrap";

export default function Estados() {
  const [estados, setEstados] = useState([
    { id: 1, nombre: "Activo", descripcion: "Disponible para venta", color: "success" },
    { id: 2, nombre: "Agotado", descripcion: "Sin unidades en inventario", color: "danger" },
    { id: 3, nombre: "En Pedido", descripcion: "Pendiente de llegada", color: "warning" },
  ]);

  const [formData, setFormData] = useState({ nombre: "", descripcion: "" });
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Mostrar mensaje temporal
  const showMsg = (text, ms = 2500) => {
    setMensaje(text);
    setTimeout(() => setMensaje(null), ms);
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({ nombre: "", descripcion: "" });
    setEditando(null);
  };

  // Cambiar campos
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Agregar o editar estado
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      showMsg("❌ El nombre del estado es obligatorio.");
      return;
    }

    const color =
      formData.nombre.toLowerCase() === "activo"
        ? "success"
        : formData.nombre.toLowerCase() === "agotado"
        ? "danger"
        : "warning";

    if (editando) {
      setEstados((prev) =>
        prev.map((e) =>
          e.id === editando.id
            ? { ...e, ...formData, color }
            : e
        )
      );
      showMsg("✅ Estado actualizado correctamente.");
    } else {
      const nuevo = {
        id: Date.now(),
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        color,
      };
      setEstados([...estados, nuevo]);
      showMsg("✅ Nuevo estado agregado.");
    }

    resetForm();
    setMostrarModal(false);
  };

  // Editar
  const handleEdit = (estado) => {
    setEditando(estado);
    setFormData({
      nombre: estado.nombre,
      descripcion: estado.descripcion,
    });
    setMostrarModal(true);
  };

  // Eliminar
  const handleDelete = (id) => {
    setEstados(estados.filter((e) => e.id !== id));
    showMsg("🗑️ Estado eliminado correctamente.");
  };

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">Gestión de Estados</h2>

        {/* Mensaje de acción */}
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

        {/* Botón agregar */}
        <div className="text-end mb-3">
          <Button variant="danger" onClick={() => setMostrarModal(true)}>
            ➕ Agregar Estado
          </Button>
        </div>

        {/* Tabla de estados */}
        <Table striped bordered hover variant="dark" className="text-center align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Estado visual</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estados.length === 0 ? (
              <tr>
                <td colSpan={5}>No hay estados registrados.</td>
              </tr>
            ) : (
              estados.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.nombre}</td>
                  <td>{e.descripcion}</td>
                  <td>
                    <Badge bg={e.color}>{e.nombre}</Badge>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-warning"
                      className="me-2"
                      onClick={() => handleEdit(e)}
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDelete(e.id)}
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

      {/* Modal */}
      <Modal
        show={mostrarModal}
        onHide={() => {
          setMostrarModal(false);
          resetForm();
        }}
        centered
      >
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>
            {editando ? "Editar Estado" : "Agregar Nuevo Estado"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-dark text-light">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Estado</Form.Label>
                  <Form.Select
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione...</option>
                    <option value="Activo">Activo</option>
                    <option value="Agotado">Agotado</option>
                    <option value="En Pedido">En Pedido</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    name="descripcion"
                    placeholder="Ej: Disponible o sin stock"
                    value={formData.descripcion}
                    onChange={handleChange}
                  />
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
