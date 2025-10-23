import React, { useState } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Alert,
  InputGroup,
} from "react-bootstrap";

export default function ProductosDanados() {
  // 🧾 Datos simulados (ejemplo base de datos)
  const [productos, setProductos] = useState([
    {
      id_producto_danado: 70,
      id_producto: 117,
      cantidad: 5,
      motivo: "Caducado",
      fecha_registro: "2024-11-20 23:52:28",
    },
    {
      id_producto_danado: 71,
      id_producto: 58,
      cantidad: 5,
      motivo: "Dañado por humedad",
      fecha_registro: "2024-03-27 17:57:18",
    },
    {
      id_producto_danado: 72,
      id_producto: 219,
      cantidad: 4,
      motivo: "Defecto de fábrica",
      fecha_registro: "2023-04-19 11:13:02",
    },
    {
      id_producto_danado: 73,
      id_producto: 216,
      cantidad: 4,
      motivo: "Caducado",
      fecha_registro: "2023-10-06 20:41:14",
    },
    {
      id_producto_danado: 74,
      id_producto: 4,
      cantidad: 4,
      motivo: "Golpe en transporte",
      fecha_registro: "2024-09-08 01:44:08",
    },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    id_producto: "",
    cantidad: "",
    motivo: "",
  });

  // 🔍 Filtrar búsqueda
  const filtrados = productos.filter(
    (p) =>
      p.motivo.toLowerCase().includes(busqueda.toLowerCase()) ||
      String(p.id_producto).includes(busqueda)
  );

  // 🧹 Limpiar formulario
  const resetForm = () => {
    setFormData({ id_producto: "", cantidad: "", motivo: "" });
    setEditando(null);
  };

  // 💬 Mostrar mensaje
  const showMsg = (texto, ms = 2500) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(null), ms);
  };

  // 📝 Cambios en formulario
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 💾 Guardar o actualizar
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      setProductos((prev) =>
        prev.map((p) =>
          p.id_producto_danado === editando.id_producto_danado
            ? { ...p, ...formData }
            : p
        )
      );
      showMsg("✅ Producto dañado actualizado correctamente.");
    } else {
      const nuevo = {
        id_producto_danado: Date.now(),
        ...formData,
        fecha_registro: new Date().toISOString().replace("T", " ").slice(0, 19),
      };
      setProductos([...productos, nuevo]);
      showMsg("✅ Producto dañado agregado correctamente.");
    }
    resetForm();
    setShowModal(false);
  };

  // ✏️ Editar registro
  const handleEdit = (prod) => {
    setEditando(prod);
    setFormData({
      id_producto: prod.id_producto,
      cantidad: prod.cantidad,
      motivo: prod.motivo,
    });
    setShowModal(true);
  };

  // 🗑️ Eliminar
  const handleDelete = (id) => {
    setProductos(productos.filter((p) => p.id_producto_danado !== id));
    showMsg("🗑️ Producto eliminado correctamente.");
  };

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">Productos Dañados</h2>

        {/* 🟢 Mensajes */}
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
        <Row className="mb-4">
          <Col md={6} className="mx-auto">
            <InputGroup>
              <Form.Control
                placeholder="Buscar por motivo o ID de producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <Button variant="outline-danger" onClick={() => setBusqueda("")}>
                ✖ Limpiar
              </Button>
            </InputGroup>
          </Col>
          <Col md={3} className="text-end">
            <Button variant="danger" onClick={() => setShowModal(true)}>
              ➕ Agregar Registro
            </Button>
          </Col>
        </Row>

        {/* 📋 Tabla */}
        <Table striped bordered hover variant="dark" className="text-center align-middle">
          <thead>
            <tr>
              <th>ID Registro</th>
              <th>ID Producto</th>
              <th>Cantidad</th>
              <th>Motivo</th>
              <th>Fecha de Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan={6}>No se encontraron resultados.</td>
              </tr>
            ) : (
              filtrados.map((p) => (
                <tr key={p.id_producto_danado}>
                  <td>{p.id_producto_danado}</td>
                  <td>{p.id_producto}</td>
                  <td>{p.cantidad}</td>
                  <td>{p.motivo}</td>
                  <td>{p.fecha_registro}</td>
                  <td>
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
                      onClick={() => handleDelete(p.id_producto_danado)}
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
        show={showModal}
        onHide={() => {
          setShowModal(false);
          resetForm();
        }}
        centered
      >
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>
            {editando ? "Editar Producto Dañado" : "Agregar Producto Dañado"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-dark text-light">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>ID Producto</Form.Label>
              <Form.Control
                type="number"
                name="id_producto"
                value={formData.id_producto}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
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
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Motivo</Form.Label>
                  <Form.Select
                    name="motivo"
                    value={formData.motivo}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione un motivo</option>
                    <option value="Caducado">Caducado</option>
                    <option value="Dañado por humedad">Dañado por humedad</option>
                    <option value="Defecto de fábrica">Defecto de fábrica</option>
                    <option value="Golpe en transporte">Golpe en transporte</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
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
