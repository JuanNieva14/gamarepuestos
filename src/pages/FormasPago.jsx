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
} from "react-bootstrap";
import {
  listarFormasPago,
  crearFormaPago,
  actualizarFormaPago,
  eliminarFormaPago,
} from "../services/formasPago";

export default function FormasPago() {
  const [formas, setFormas] = useState([]);
  const [formData, setFormData] = useState({
    nombre_forma: "",
    descripcion: "",
    activo: 1,
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
      const res = await listarFormasPago();
      const ordenadas = res.data.sort((a, b) => a.id_forma_pago - b.id_forma_pago);
      setFormas(ordenadas);
    } catch {
      showMsg("❌ Error al cargar las formas de pago.", "danger");
    }
  };

  useEffect(() => {
    listar();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // convertir "activo" a número
    setFormData({
      ...formData,
      [name]: name === "activo" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      if (editId) {
        await actualizarFormaPago(editId, formData);
        showMsg(
          formData.activo === 1
            ? "✅ Forma de pago activada y actualizada correctamente."
            : "⚠️ Forma de pago actualizada y marcada como inactiva.",
          "success"
        );
      } else {
        await crearFormaPago(formData);
        showMsg("✅ Nueva forma de pago agregada correctamente.");
      }
      listar();
      setFormData({ nombre_forma: "", descripcion: "", activo: 1 });
      setEditId(null);
    } catch {
      showMsg("❌ Error al guardar la forma de pago.", "danger");
    } finally {
      setCargando(false);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id_forma_pago);
    setFormData({
      nombre_forma: item.nombre_forma,
      descripcion: item.descripcion,
      activo: item.activo,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta forma de pago?")) return;
    try {
      await eliminarFormaPago(id);
      showMsg("🗑️ Forma de pago eliminada correctamente.");
      listar();
    } catch {
      showMsg("❌ Error al eliminar la forma de pago.", "danger");
    }
  };

  const filtradas = formas.filter(
    (f) =>
      f.nombre_forma.toLowerCase().includes(busqueda.toLowerCase()) ||
      f.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🔢 Paginación
  const totalPaginas = Math.ceil(filtradas.length / porPagina) || 1;
  const inicio = (pagina - 1) * porPagina;
  const datosPagina = filtradas.slice(inicio, inicio + porPagina);

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">Formas de Pago</h2>

        {mensaje && (
          <Alert variant={tipoMsg} className="text-center fw-bold">
            {mensaje}
          </Alert>
        )}

        {/* 🔍 Buscador */}
        <InputGroup className="mb-4">
          <Form.Control
            placeholder="Buscar por nombre o descripción..."
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
          <div className="d-flex gap-2 flex-wrap">
            <Form.Control
              name="nombre_forma"
              placeholder="Nombre de la forma de pago"
              value={formData.nombre_forma}
              onChange={handleChange}
              required
            />
            <Form.Control
              name="descripcion"
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={handleChange}
              required
            />

            {/* Nuevo campo Activo/Inactivo */}
            <Form.Select
              name="activo"
              value={formData.activo}
              onChange={handleChange}
              style={{ maxWidth: "200px" }}
            >
              <option value={1}>✅ Activo</option>
              <option value={0}>❌ Inactivo</option>
            </Form.Select>

            <Button variant="danger" type="submit" disabled={cargando}>
              {cargando ? <Spinner size="sm" animation="border" /> : editId ? "Actualizar" : "Agregar"}
            </Button>
          </div>
        </Form>

        {/* 🧾 Tabla */}
        <Table striped bordered hover variant="dark" className="text-center align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datosPagina.length > 0 ? (
              datosPagina.map((f) => (
                <tr key={f.id_forma_pago}>
                  <td>{f.id_forma_pago}</td>
                  <td>{f.nombre_forma}</td>
                  <td>{f.descripcion}</td>
                  <td>{f.activo === 1 ? "✅ Sí" : "❌ No"}</td>
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
                      onClick={() => handleDelete(f.id_forma_pago)}
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
        {filtradas.length > porPagina && (
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

