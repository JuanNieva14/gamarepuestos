import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
  Alert,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import axios from "axios";

export default function CategoriasRepuestos() {
  const API_URL = "http://localhost:8001/categorias";

  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({ nombre_categoria: "", activo: 1 });
  const [editId, setEditId] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [tipoMsg, setTipoMsg] = useState("success");
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);

  // 🔢 Paginación
  const porPagina = 10;
  const [paginaActiva, setPaginaActiva] = useState(1);
  const [paginaInactiva, setPaginaInactiva] = useState(1);

  const showMsg = (texto, tipo = "success", ms = 2500) => {
    setMensaje(texto);
    setTipoMsg(tipo);
    setTimeout(() => setMensaje(null), ms);
  };

  const resetForm = () => {
    setFormData({ nombre_categoria: "", activo: 1 });
    setEditId(null);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const listarCategorias = async () => {
    try {
      const res = await axios.get(API_URL);
      setCategorias(res.data);
    } catch {
      showMsg("❌ Error al cargar las categorías.", "danger");
    }
  };

  const crearCategoria = async () => {
    try {
      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "application/json" },
      });
      showMsg(res.data.mensaje || "✅ Categoría creada correctamente.");
      listarCategorias();
    } catch {
      showMsg("❌ Error al crear la categoría.", "danger");
    }
  };

  const actualizarCategoria = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, formData);
      showMsg(res.data.mensaje || "✅ Categoría actualizada.");
      listarCategorias();
    } catch {
      showMsg("❌ Error al actualizar la categoría.", "danger");
    }
  };

  const eliminarCategoria = async (id) => {
    if (window.confirm("¿Eliminar esta categoría permanentemente?")) {
      try {
        const res = await axios.delete(`${API_URL}/eliminar/${id}`);
        showMsg(res.data.mensaje || "🗑️ Categoría eliminada.");
        listarCategorias();
      } catch {
        showMsg("❌ Error al eliminar la categoría.", "danger");
      }
    }
  };

  const activarCategoria = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/activar/${id}`);
      showMsg(res.data.mensaje || "✅ Categoría activada.");
      listarCategorias();
    } catch {
      showMsg("❌ Error al activar la categoría.", "danger");
    }
  };

  const desactivarCategoria = async (id) => {
    if (window.confirm("¿Desactivar esta categoría?")) {
      try {
        const res = await axios.delete(`${API_URL}/${id}`);
        showMsg(res.data.mensaje || "⚠️ Categoría desactivada.");
        listarCategorias();
      } catch {
        showMsg("❌ Error al desactivar la categoría.", "danger");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nombreTrim = formData.nombre_categoria.trim();
    if (!nombreTrim)
      return showMsg("❌ El nombre de la categoría es obligatorio.", "danger");

    if (editId) await actualizarCategoria(editId);
    else await crearCategoria();
    resetForm();
  };

  const handleEdit = (cat) => {
    setEditId(cat.id_categoria);
    setFormData({
      nombre_categoria: cat.nombre_categoria,
      activo: cat.activo,
    });
  };

  useEffect(() => {
    listarCategorias();
  }, []);

  // 🔍 Buscador mejorado (por nombre o ID)
  const categoriasFiltradas = categorias.filter((c) => {
    const term = busqueda.toLowerCase();
    return (
      c.nombre_categoria.toLowerCase().includes(term) ||
      c.id_categoria.toString().includes(term)
    );
  });

  // 🔢 Divisiones por estado
  const activas = categoriasFiltradas.filter((c) => c.activo === 1);
  const inactivas = categoriasFiltradas.filter((c) => c.activo === 0);

  // 📄 Paginación activas
  const totalPaginasActivas = Math.ceil(activas.length / porPagina) || 1;
  const inicioActivas = (paginaActiva - 1) * porPagina;
  const activasPagina = activas.slice(inicioActivas, inicioActivas + porPagina);

  // 📄 Paginación inactivas
  const totalPaginasInactivas = Math.ceil(inactivas.length / porPagina) || 1;
  const inicioInactivas = (paginaInactiva - 1) * porPagina;
  const inactivasPagina = inactivas.slice(inicioInactivas, inicioInactivas + porPagina);

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">Categorías de Repuestos</h2>

        {mensaje && (
          <Alert variant={tipoMsg} className="text-center fw-bold">
            {mensaje}
          </Alert>
        )}

        {/* 🔍 Búsqueda */}
        <Row className="mb-4">
          <Col md={6} className="mx-auto">
            <InputGroup>
              <Form.Control
                placeholder="Buscar por nombre o ID..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <Button variant="outline-danger" onClick={() => setBusqueda("")}>
                ✖ Limpiar
              </Button>
            </InputGroup>
          </Col>
        </Row>

        {/* 🧾 Formulario */}
        <Form onSubmit={handleSubmit} className="mb-3">
          <Row className="g-3">
            <Col md={8}>
              <Form.Group>
                <Form.Label>Nombre de la categoría</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre_categoria"
                  value={formData.nombre_categoria}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button
                type="submit"
                variant={editId ? "warning" : "danger"}
                className="w-100"
                disabled={cargando}
              >
                {cargando ? (
                  <Spinner size="sm" animation="border" />
                ) : editId ? (
                  "💾 Guardar cambios"
                ) : (
                  "➕ Agregar categoría"
                )}
              </Button>
            </Col>
          </Row>
        </Form>

        {/* 🟢 Categorías Activas */}
        <h5 className="text-light mt-4 mb-2">Categorías Activas</h5>
        <Table
          striped
          bordered
          hover
          variant="dark"
          className="text-center align-middle"
        >
          <thead>
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th style={{ width: "60%" }}>Nombre</th>
              <th style={{ width: "30%" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {activasPagina.length === 0 ? (
              <tr>
                <td colSpan={3}>No hay categorías activas</td>
              </tr>
            ) : (
              activasPagina.map((cat) => (
                <tr key={cat.id_categoria}>
                  <td>{cat.id_categoria}</td>
                  <td>{cat.nombre_categoria}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-warning"
                      className="me-2"
                      onClick={() => handleEdit(cat)}
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => desactivarCategoria(cat.id_categoria)}
                    >
                      📴 Desactivar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {/* 🔢 Paginación Activas */}
        {activas.length > porPagina && (
          <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
            <Button
              variant="outline-light"
              size="sm"
              disabled={paginaActiva === 1}
              onClick={() => setPaginaActiva(paginaActiva - 1)}
            >
              ⬅️
            </Button>
            <span>
              Sesión {paginaActiva} de {totalPaginasActivas}
            </span>
            <Button
              variant="outline-light"
              size="sm"
              disabled={paginaActiva === totalPaginasActivas}
              onClick={() => setPaginaActiva(paginaActiva + 1)}
            >
              ➡️
            </Button>
          </div>
        )}

        {/* 🔴 Categorías Inactivas */}
        <h5 className="text-light mt-4 mb-2">Categorías Inactivas</h5>
        <Table
          striped
          bordered
          hover
          variant="dark"
          className="text-center align-middle"
        >
          <thead>
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th style={{ width: "60%" }}>Nombre</th>
              <th style={{ width: "30%" }}>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {inactivasPagina.length === 0 ? (
              <tr>
                <td colSpan={3}>No hay categorías inactivas</td>
              </tr>
            ) : (
              inactivasPagina.map((cat) => (
                <tr key={cat.id_categoria}>
                  <td>{cat.id_categoria}</td>
                  <td>{cat.nombre_categoria}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-success"
                      className="me-2"
                      onClick={() => activarCategoria(cat.id_categoria)}
                    >
                      🔄 Activar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => eliminarCategoria(cat.id_categoria)}
                    >
                      🗑️ Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {/* 🔢 Paginación Inactivas */}
        {inactivas.length > porPagina && (
          <div className="d-flex justify-content-center align-items-center gap-3">
            <Button
              variant="outline-light"
              size="sm"
              disabled={paginaInactiva === 1}
              onClick={() => setPaginaInactiva(paginaInactiva - 1)}
            >
              ⬅️
            </Button>
            <span>
              Sesión {paginaInactiva} de {totalPaginasInactivas}
            </span>
            <Button
              variant="outline-light"
              size="sm"
              disabled={paginaInactiva === totalPaginasInactivas}
              onClick={() => setPaginaInactiva(paginaInactiva + 1)}
            >
              ➡️
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}
