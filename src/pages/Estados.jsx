import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Form,
  InputGroup,
  Alert,
  Spinner,
  Badge,
} from "react-bootstrap";
import {
  listarEstados,
  crearEstado,
  actualizarEstado,
  eliminarEstado,
} from "../services/estados";

export default function Estados() {
  const [estados, setEstados] = useState([]);
  const [formData, setFormData] = useState({
    nombre_estado: "",
    tipo_estado: "Producto",
  });
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [tipoMsg, setTipoMsg] = useState("success");
  const [editId, setEditId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [pagina, setPagina] = useState(1);
  const porPagina = 10;

  const showMsg = (text, tipo = "success", ms = 2500) => {
    setMensaje(text);
    setTipoMsg(tipo);
    setTimeout(() => setMensaje(null), ms);
  };

  const listar = async () => {
    try {
      const res = await listarEstados();
      const ordenadas = res.data.sort((a, b) => a.id_estado - b.id_estado);
      setEstados(ordenadas);
    } catch {
      showMsg("❌ Error al cargar los estados.", "danger");
    }
  };

  useEffect(() => {
    listar();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      if (editId) {
        await actualizarEstado(editId, formData);
        showMsg("✅ Estado actualizado correctamente.");
      } else {
        await crearEstado(formData);
        showMsg("✅ Estado creado correctamente.");
      }
      listar();
      setFormData({ nombre_estado: "", tipo_estado: "Producto" });
      setEditId(null);
    } catch {
      showMsg("❌ Error al guardar el estado.", "danger");
    } finally {
      setCargando(false);
    }
  };

  const handleEdit = (estado) => {
    setEditId(estado.id_estado);
    setFormData({
      nombre_estado: estado.nombre_estado,
      tipo_estado: estado.tipo_estado,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este estado?")) return;
    try {
      await eliminarEstado(id);
      showMsg("🗑️ Estado eliminado correctamente.");
      listar();
    } catch {
      showMsg("❌ Error al eliminar el estado.", "danger");
    }
  };

  // 🔍 Filtro de búsqueda
  const filtrados = estados.filter(
    (e) =>
      e.nombre_estado.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.tipo_estado.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🔢 Paginación
  const totalPaginas = Math.ceil(filtrados.length / porPagina) || 1;
  const inicio = (pagina - 1) * porPagina;
  const datosPagina = filtrados.slice(inicio, inicio + porPagina);

  // 🎨 Colores automáticos para el Badge según el nombre
  const colorEstado = (nombre) => {
    const lower = nombre.toLowerCase();
    if (lower.includes("activo")) return "success";
    if (lower.includes("inactivo")) return "secondary";
    if (lower.includes("agotado")) return "danger";
    if (lower.includes("pedido")) return "warning";
    if (lower.includes("pendiente")) return "secondary";
    if (lower.includes("pagada") || lower.includes("pagado")) return "info";
    if (lower.includes("cancelado")) return "dark";
    if (lower.includes("enviado") || lower.includes("aceptada")) return "primary";
    if (lower.includes("rechazada") || lower.includes("anulada")) return "danger";
    if (lower.includes("vigente")) return "success";
    if (lower.includes("vencida")) return "warning";
    if (lower.includes("recibido")) return "success";
    return "info";
  };

  // 🔁 Nombres únicos para desplegable
  const nombresUnicos = [...new Set(estados.map((e) => e.nombre_estado))];

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">Gestión de Estados</h2>

        {mensaje && (
          <Alert variant={tipoMsg} className="text-center fw-bold">
            {mensaje}
          </Alert>
        )}

        {/* 🔍 Buscador */}
        <InputGroup className="mb-4">
          <Form.Control
            placeholder="Buscar por nombre o tipo de estado..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPagina(1);
            }}
          />
          <Button variant="outline-danger" onClick={() => setBusqueda("")}>
            ✖ Limpiar
          </Button>
        </InputGroup>

        {/* 🧾 Formulario */}
        <Form onSubmit={handleSubmit} className="mb-4">
          <div className="d-flex gap-2 flex-wrap align-items-center">

            {/* ✅ Campo inteligente: input o select según si está editando */}
            {editId ? (
              <Form.Select
                name="nombre_estado"
                value={formData.nombre_estado}
                onChange={handleChange}
                className="text-white"
                style={{
                  backgroundColor: "#212529",
                  color: "white",
                  maxWidth: "240px",
                }}
              >
                <option value="">Seleccione un estado existente...</option>
                {nombresUnicos.map((nombre, i) => (
                  <option key={i} value={nombre}>
                    {nombre}
                  </option>
                ))}
              </Form.Select>
            ) : (
              <Form.Control
                name="nombre_estado"
                placeholder="Nombre del estado"
                value={formData.nombre_estado}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#212529",
                  color: "white",
                  maxWidth: "240px",
                }}
              />
            )}

            {/* Tipos de estado extendidos */}
            <Form.Select
              name="tipo_estado"
              value={formData.tipo_estado}
              onChange={handleChange}
              style={{
                backgroundColor: "#212529",
                color: "white",
                maxWidth: "220px",
              }}
            >
              <option value="Producto">Producto</option>
              <option value="Factura">Factura</option>
              <option value="Pedido">Pedido</option>
              <option value="Cotización">Cotización</option>
              <option value="Usuario">Usuario</option>
            </Form.Select>

            <Button variant="danger" type="submit" disabled={cargando}>
              {cargando ? (
                <Spinner size="sm" animation="border" />
              ) : editId ? (
                "Actualizar"
              ) : (
                "Agregar"
              )}
            </Button>

            {editId && (
              <Button
                variant="secondary"
                onClick={() => {
                  setEditId(null);
                  setFormData({ nombre_estado: "", tipo_estado: "Producto" });
                }}
              >
                Cancelar
              </Button>
            )}
          </div>
        </Form>

        {/* 🧾 Tabla */}
        <Table striped bordered hover variant="dark" className="text-center align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Estado visual</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datosPagina.length > 0 ? (
              datosPagina.map((e) => (
                <tr key={e.id_estado}>
                  <td>{e.id_estado}</td>
                  <td>{e.nombre_estado}</td>
                  <td>{e.tipo_estado}</td>
                  <td>
                    <Badge bg={colorEstado(e.nombre_estado)}>{e.nombre_estado}</Badge>
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
                      onClick={() => handleDelete(e.id_estado)}
                    >
                      🗑️ Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No se encontraron resultados.</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* 🔢 Paginación */}
        {filtrados.length > porPagina && (
          <div className="d-flex justify-content-center align-items-center gap-3">
            <Button
              variant="outline-light"
              size="sm"
              disabled={pagina === 1}
              onClick={() => setPagina(pagina - 1)}
            >
              ⬅️
            </Button>
            <span>
              Página {pagina} de {totalPaginas}
            </span>
            <Button
              variant="outline-light"
              size="sm"
              disabled={pagina === totalPaginas}
              onClick={() => setPagina(pagina + 1)}
            >
              ➡️
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}
