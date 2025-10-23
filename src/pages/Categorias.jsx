import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
  Alert,
  Badge,
  InputGroup,
} from "react-bootstrap";

/* 🔽 Componente reutilizable: lista desplegable */
export function CategorySelect({ categories = [], value, onChange }) {
  const capitalizar = (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
  return (
    <Form.Select value={value} onChange={onChange}>
      <option value="">Seleccione una categoría</option>
      {categories.map((c) => (
        <option key={c.id} value={c.id}>
          {capitalizar(c.nombre)}
        </option>
      ))}
    </Form.Select>
  );
}

/* 💡 Página principal Categoría de Repuestos */
export default function CategoriasRepuestos() {
  const [categorias, setCategorias] = useState([
    { id: 1, nombre: "Lubricantes", descripcion: "Aceites y grasas", estado: "Activo" },
    { id: 2, nombre: "Motor", descripcion: "Partes internas del motor", estado: "Activo" },
    { id: 3, nombre: "Frenos", descripcion: "Pastillas, discos, bombas", estado: "Inactivo" },
    { id: 4, nombre: "Eléctricos", descripcion: "Baterías, bombillos y arneses", estado: "Activo" },
    { id: 5, nombre: "Accesorios", descripcion: "Artículos de personalización", estado: "Activo" },
  ]);

  const [formData, setFormData] = useState({ nombre: "", descripcion: "", estado: "Activo" });
  const [editId, setEditId] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const capitalizar = (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();

  const showMsg = (text, ms = 2200) => {
    setMensaje(text);
    setTimeout(() => setMensaje(null), ms);
  };

  const resetForm = () => {
    setFormData({ nombre: "", descripcion: "", estado: "Activo" });
    setEditId(null);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const nombreTrim = formData.nombre.trim();
    if (!nombreTrim) {
      showMsg("❌ El nombre de la categoría es obligatorio.");
      return;
    }

    if (editId) {
      setCategorias((prev) =>
        prev.map((c) => (c.id === editId ? { ...c, ...formData, nombre: nombreTrim } : c))
      );
      showMsg("✅ Categoría actualizada correctamente.");
    } else {
      const nueva = {
        id: Date.now(),
        nombre: nombreTrim,
        descripcion: formData.descripcion.trim(),
        estado: formData.estado,
      };
      setCategorias((prev) => [...prev, nueva]);
      showMsg("✅ Categoría creada exitosamente.");
    }
    resetForm();
  };

  const handleEdit = (cat) => {
    setEditId(cat.id);
    setFormData({
      nombre: cat.nombre,
      descripcion: cat.descripcion || "",
      estado: cat.estado || "Activo",
    });
  };

  const handleDelete = (id) => {
    setCategorias((prev) => prev.filter((c) => c.id !== id));
    showMsg("🗑️ Categoría eliminada.");
    if (editId === id) resetForm();
  };

  const renderEstado = (estado) => (
    <Badge bg={estado === "Activo" ? "success" : "secondary"}>{estado}</Badge>
  );

  // 🔍 Filtro de búsqueda
  const categoriasFiltradas = categorias.filter(
    (c) =>
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (c.descripcion && c.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">Categoría de Repuestos</h2>

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

        {/* 🔎 Barra de búsqueda */}
        <Row className="mb-4">
          <Col md={6} className="mx-auto">
            <InputGroup>
              <Form.Control
                placeholder="Buscar por nombre o descripción..."
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
        </Row>

        {/* Formulario CRUD */}
        <Form onSubmit={handleSubmit} className="mb-3">
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Nombre de la categoría</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Ej: Lubricantes, Motor, Frenos…"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={5}>
              <Form.Group>
                <Form.Label>Descripción (opcional)</Form.Label>
                <Form.Control
                  type="text"
                  name="descripcion"
                  placeholder="Breve descripción"
                  value={formData.descripcion}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
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

          <div className="d-flex gap-2 mt-3">
            <Button type="submit" variant={editId ? "warning" : "danger"}>
              {editId ? "💾 Guardar cambios" : "➕ Agregar categoría"}
            </Button>
            {editId && (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancelar
              </Button>
            )}
          </div>
        </Form>

        {/* 🧾 Tabla de categorías */}
        <Table striped bordered hover variant="dark" className="text-center align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categoriasFiltradas.length === 0 ? (
              <tr>
                <td colSpan={5}>No se encontraron resultados.</td>
              </tr>
            ) : (
              categoriasFiltradas.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{capitalizar(c.nombre)}</td>
                  <td>{c.descripcion || "—"}</td>
                  <td>{renderEstado(c.estado)}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-warning"
                      className="me-2"
                      onClick={() => handleEdit(c)}
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDelete(c.id)}
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
    </Container>
  );
}
