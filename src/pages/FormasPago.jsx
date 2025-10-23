import React, { useState } from "react";
import {
  Container,
  Table,
  Card,
  Button,
  Modal,
  Form,
  Alert,
  Row,
  Col,
} from "react-bootstrap";

export default function FormasPago() {
  // 💳 Datos iniciales
  const [formas, setFormas] = useState([
    { id: 1, tipo: "Efectivo", estado: "Activo" },
    { id: 2, tipo: "Transferencia", estado: "Activo" },
    { id: 3, tipo: "Tarjeta Débito", estado: "Activo" },
    { id: 4, tipo: "Tarjeta Crédito", estado: "Activo" },
    { id: 5, tipo: "Nequi", estado: "Activo" },
  ]);

  const [formData, setFormData] = useState({ tipo: "", estado: "Activo" });
  const [mensaje, setMensaje] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editando, setEditando] = useState(null);

  // 🧹 Limpiar formulario
  const resetForm = () => {
    setFormData({ tipo: "", estado: "Activo" });
    setEditando(null);
  };

  // 💬 Mostrar mensaje temporal
  const showMsg = (text, ms = 2500) => {
    setMensaje(text);
    setTimeout(() => setMensaje(null), ms);
  };

  // 📝 Cambiar campos
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 💾 Guardar o editar
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      setFormas((prev) =>
        prev.map((f) =>
          f.id === editando.id ? { ...f, ...formData } : f
        )
      );
      showMsg("✅ Forma de pago actualizada correctamente.");
    } else {
      const nuevo = { id: Date.now(), ...formData };
      setFormas([...formas, nuevo]);
      showMsg("✅ Nueva forma de pago agregada.");
    }
    resetForm();
    setMostrarModal(false);
  };

  // ✏️ Editar forma de pago
  const handleEdit = (forma) => {
    setEditando(forma);
    setFormData({ tipo: forma.tipo, estado: forma.estado });
    setMostrarModal(true);
  };

  // 🗑️ Eliminar
  const handleDelete = (id) => {
    setFormas(formas.filter((f) => f.id !== id));
    showMsg("🗑️ Forma de pago eliminada.");
  };

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">Formas de Pago</h2>

        {/* 🔔 Mensaje */}
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

        {/* 🔘 Botón agregar */}
        <div className="text-end mb-3">
          <Button variant="danger" onClick={() => setMostrarModal(true)}>
            ➕ Agregar Forma de Pago
          </Button>
        </div>

        {/* 📋 Tabla */}
        <Table striped bordered hover variant="dark" className="text-center align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo de Pago</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {formas.length === 0 ? (
              <tr>
                <td colSpan={4}>No hay formas de pago registradas.</td>
              </tr>
            ) : (
              formas.map((f) => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.tipo}</td>
                  <td>{f.estado}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-warning"
                      className="me-2"
                      onClick={() => handleEdit(f)}
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDelete(f.id)}
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
        onHide={() => {
          setMostrarModal(false);
          resetForm();
        }}
        centered
      >
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>
            {editando ? "Editar Forma de Pago" : "Agregar Forma de Pago"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-dark text-light">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de Pago</Form.Label>
                  <Form.Select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="Tarjeta Débito">Tarjeta Débito</option>
                    <option value="Tarjeta Crédito">Tarjeta Crédito</option>
                    <option value="Nequi">Nequi</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
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
