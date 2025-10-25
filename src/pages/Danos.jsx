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
  listarDanos,
  crearDano,
  actualizarDano,
  eliminarDano,
} from "../services/danos";

export default function Danos() {
  const [danos, setDanos] = useState([]);
  const [formData, setFormData] = useState({
    id_producto: "",
    cantidad: "",
    motivo: "",
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
      const res = await listarDanos();
      setDanos(res.data);
    } catch {
      showMsg("❌ Error al cargar los registros.", "danger");
    }
  };

  useEffect(() => {
    listar();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      if (editId) {
        await actualizarDano(editId, formData);
        showMsg("✅ Registro actualizado correctamente.");
      } else {
        await crearDano(formData);
        showMsg("✅ Registro agregado correctamente.");
      }
      listar();
      setFormData({ id_producto: "", cantidad: "", motivo: "" });
      setEditId(null);
    } catch {
      showMsg("❌ Error al guardar el registro.", "danger");
    } finally {
      setCargando(false);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id_producto_danado);
    setFormData({
      id_producto: item.id_producto,
      cantidad: item.cantidad,
      motivo: item.motivo,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este registro?")) return;
    try {
      await eliminarDano(id);
      showMsg("🗑️ Registro eliminado correctamente.");
      listar();
    } catch {
      showMsg("❌ Error al eliminar el registro.", "danger");
    }
  };

  const danosFiltrados = danos.filter(
    (d) =>
      d.motivo.toLowerCase().includes(busqueda.toLowerCase()) ||
      d.id_producto.toString().includes(busqueda)
  );

  // 🔢 Paginación
  const totalPaginas = Math.ceil(danosFiltrados.length / porPagina) || 1;
  const inicio = (pagina - 1) * porPagina;
  const datosPagina = danosFiltrados.slice(inicio, inicio + porPagina);

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">Productos Dañados</h2>

        {mensaje && (
          <Alert variant={tipoMsg} className="text-center fw-bold">
            {mensaje}
          </Alert>
        )}

        <InputGroup className="mb-4">
          <Form.Control
            placeholder="Buscar por motivo o ID de producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Button variant="outline-danger" onClick={() => setBusqueda("")}>
            ✖ Limpiar
          </Button>
        </InputGroup>

        <Form onSubmit={handleSubmit} className="mb-4">
          <div className="d-flex gap-2">
            <Form.Control
              type="number"
              name="id_producto"
              placeholder="ID Producto"
              value={formData.id_producto}
              onChange={handleChange}
              required
            />
            <Form.Control
              type="number"
              name="cantidad"
              placeholder="Cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              required
            />
            <Form.Control
              type="text"
              name="motivo"
              placeholder="Motivo del daño"
              value={formData.motivo}
              onChange={handleChange}
              required
            />
            <Button variant="danger" type="submit" disabled={cargando}>
              {cargando ? <Spinner size="sm" animation="border" /> : "Guardar"}
            </Button>
          </div>
        </Form>

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
            {datosPagina.map((d) => (
              <tr key={d.id_producto_danado}>
                <td>{d.id_producto_danado}</td>
                <td>{d.id_producto}</td>
                <td>{d.cantidad}</td>
                <td>{d.motivo}</td>
                <td>{d.fecha_registro}</td>
                <td>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(d)}
                  >
                    ✏️ Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(d.id_producto_danado)}
                  >
                    🗑️ Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* 🔢 Paginación */}
        {danosFiltrados.length > porPagina && (
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
              Sesión {pagina} de {totalPaginas}
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
