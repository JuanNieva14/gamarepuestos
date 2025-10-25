import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  Container,
  Card,
  Table,
  Button,
  Form,
  InputGroup,
  Alert,
  Badge,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import {
  listarPedidos,
  crearPedido,
  actualizarPedido,
  eliminarPedido,
  listarProveedores,
  listarUsuarios,
  listarEstadosPedido,
} from "../services/pedidos";

export default function PedidosProveedores() {
  const [pedidos, setPedidos] = useState([]);
  const [formData, setFormData] = useState({
    id_proveedor: null,
    id_usuario: null,
    id_estado: null,
    fecha_entrega_esperada: "",
    total: "",
    observaciones: "",
  });

  const [proveedores, setProveedores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [estados, setEstados] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [tipoMsg, setTipoMsg] = useState("success");
  const [editId, setEditId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [pagina, setPagina] = useState(1);
  const porPagina = 10;

  // 🎨 Estilos personalizados para react-select (modo oscuro)
  const selectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#212529",
      borderColor: "#495057",
      color: "white",
      minHeight: "38px",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "white",
    }),
    input: (styles) => ({
      ...styles,
      color: "white",
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "#2c2f33",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#dc3545"
        : isFocused
        ? "#343a40"
        : "#2c2f33",
      color: "white",
      cursor: "pointer",
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "#adb5bd",
    }),
  };

  // 🔔 Mostrar mensajes de éxito o error
  const showMsg = (text, tipo = "success", ms = 2500) => {
    setMensaje(text);
    setTipoMsg(tipo);
    setTimeout(() => setMensaje(null), ms);
  };

  // 📦 Cargar pedidos y listas
  const listar = async () => {
    try {
      const res = await listarPedidos();
      setPedidos(res.data);
    } catch {
      showMsg("❌ Error al cargar pedidos.", "danger");
    }
  };

  const cargarListas = async () => {
    try {
      const [prov, usu, est] = await Promise.all([
        listarProveedores(),
        listarUsuarios(),
        listarEstadosPedido(),
      ]);
      setProveedores(
        prov.data.map((p) => ({ value: p.id_proveedor, label: p.nombre }))
      );
      setUsuarios(
        usu.data.map((u) => ({ value: u.id_usuario, label: u.usuario }))
      );
      setEstados(
        est.data.map((e) => ({ value: e.id_estado, label: e.nombre_estado }))
      );
    } catch (err) {
      console.error("⚠️ Error al cargar listas:", err);
      showMsg("⚠️ Error al cargar listas.", "warning");
    }
  };

  useEffect(() => {
    listar();
    cargarListas();
  }, []);

  // 🧾 Actualizar formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 💾 GUARDAR o ACTUALIZAR pedido
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id_proveedor || !formData.id_usuario || !formData.id_estado) {
      showMsg("⚠️ Debe seleccionar proveedor, usuario y estado.", "warning");
      return;
    }

    // Formatear fecha de entrega esperada
    const fechaEntregaISO = formData.fecha_entrega_esperada
      ? new Date(formData.fecha_entrega_esperada).toISOString().split("T")[0]
      : null;

    const dataEnviar = {
      id_proveedor: formData.id_proveedor?.value,
      id_usuario: formData.id_usuario?.value,
      id_estado: formData.id_estado?.value,
      fecha_entrega_esperada: fechaEntregaISO,
      total: parseFloat(formData.total || 0),
      observaciones: formData.observaciones || null,
    };

    console.log("🛰️ Enviando datos:", dataEnviar);

    setCargando(true);
    try {
      if (editId) {
        await actualizarPedido(editId, dataEnviar);
        showMsg("✏️ Pedido actualizado correctamente.");
      } else {
        await crearPedido(dataEnviar);
        showMsg("✅ Pedido creado correctamente.");
      }

      await listar();
      limpiarFormulario();
    } catch (err) {
      console.error("❌ Error al guardar pedido:", err);
      showMsg(
        err.response?.data?.detail || "❌ Error al guardar el pedido.",
        "danger"
      );
    } finally {
      setCargando(false);
    }
  };

  // 🧼 Limpiar formulario
  const limpiarFormulario = () => {
    setFormData({
      id_proveedor: null,
      id_usuario: null,
      id_estado: null,
      fecha_entrega_esperada: "",
      total: "",
      observaciones: "",
    });
    setEditId(null);
  };

  // ✏️ Editar
  const handleEdit = (pedido) => {
    const proveedorSel = proveedores.find((p) => p.label === pedido.Proveedor);
    const usuarioSel = usuarios.find(
      (u) => u.label === pedido.Usuario_Responsable
    );
    const estadoSel = estados.find((e) => e.label === pedido.Estado);

    setEditId(pedido.id_pedido);
    setFormData({
      id_proveedor: proveedorSel || null,
      id_usuario: usuarioSel || null,
      id_estado: estadoSel || null,
      fecha_entrega_esperada: pedido.Fecha_Entrega_Esperada || "",
      total: pedido.Total_COP.replace(/[^\d]/g, ""),
      observaciones: pedido.observaciones || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🗑️ Eliminar
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este pedido?")) return;
    try {
      await eliminarPedido(id);
      listar();
      showMsg("🗑️ Pedido eliminado correctamente.");
    } catch {
      showMsg("❌ Error al eliminar el pedido.", "danger");
    }
  };

  // 🎨 Colores de estado
  const colorEstado = (estado) => {
    const lower = estado.toLowerCase();
    if (lower.includes("pendiente")) return "warning";
    if (lower.includes("recibido")) return "success";
    if (lower.includes("cancelado")) return "danger";
    if (lower.includes("enviado")) return "info";
    return "secondary";
  };

  // 🔍 Filtro de búsqueda
  const filtrados = pedidos.filter(
    (p) =>
      p.Proveedor.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.Estado.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.Numero_Pedido.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(filtrados.length / porPagina) || 1;
  const inicio = (pagina - 1) * porPagina;
  const datosPagina = filtrados.slice(inicio, inicio + porPagina);

  // 🖥️ Render
  return (
    <Container fluid className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Pedidos a Proveedores</h2>

        {mensaje && (
          <Alert variant={tipoMsg} className="text-center fw-bold">
            {mensaje}
          </Alert>
        )}

        {/* 🔍 BUSCADOR */}
        <InputGroup className="mb-4">
          <Form.Control
            placeholder="Buscar por proveedor, número o estado..."
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

        {/* 🧾 FORMULARIO */}
        <Form onSubmit={handleSubmit} className="mb-4">
          <Row className="g-3">
            <Col md={3}>
              <Select
                styles={selectStyles}
                value={formData.id_proveedor}
                onChange={(opt) =>
                  setFormData({ ...formData, id_proveedor: opt })
                }
                options={proveedores}
                placeholder="Buscar proveedor..."
                isClearable
              />
            </Col>

            <Col md={2}>
              <Select
                styles={selectStyles}
                value={formData.id_usuario}
                onChange={(opt) =>
                  setFormData({ ...formData, id_usuario: opt })
                }
                options={usuarios}
                placeholder="Buscar usuario..."
                isClearable
              />
            </Col>

            <Col md={2}>
              <Select
                styles={selectStyles}
                value={formData.id_estado}
                onChange={(opt) => setFormData({ ...formData, id_estado: opt })}
                options={estados}
                placeholder="Buscar estado..."
                isClearable
              />
            </Col>

            <Col md={2}>
              <Form.Control
                type="date"
                name="fecha_entrega_esperada"
                value={formData.fecha_entrega_esperada}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="g-3 mt-2 align-items-center">
            <Col md={3}>
              <Form.Control
                type="number"
                name="total"
                placeholder="Total COP"
                value={formData.total}
                onChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <Form.Control
                type="text"
                name="observaciones"
                placeholder="Descripción / observaciones"
                value={formData.observaciones}
                onChange={handleChange}
              />
            </Col>
            <Col md="auto">
              <Button variant="danger" type="submit" disabled={cargando}>
                {cargando ? (
                  <Spinner size="sm" animation="border" />
                ) : editId ? (
                  "Actualizar"
                ) : (
                  "Crear Pedido"
                )}
              </Button>
            </Col>
            {editId && (
              <Col md="auto">
                <Button variant="secondary" onClick={limpiarFormulario}>
                  Cancelar
                </Button>
              </Col>
            )}
          </Row>
        </Form>

        {/* 🧾 TABLA */}
        <div style={{ overflowX: "auto" }}>
          <Table
            striped
            bordered
            hover
            variant="dark"
            className="text-center align-middle"
            style={{ minWidth: "1500px" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Número Pedido</th>
                <th>Proveedor</th>
                <th>Usuario Responsable</th>
                <th>Fecha Pedido</th>
                <th>Fecha Entrega Esperada</th>
                <th>Estado</th>
                <th>Total (COP)</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datosPagina.length > 0 ? (
                datosPagina.map((p) => (
                  <tr key={p.id_pedido}>
                    <td>{p.id_pedido}</td>
                    <td>{p.Numero_Pedido}</td>
                    <td>{p.Proveedor}</td>
                    <td>{p.Usuario_Responsable}</td>
                    <td>{p.Fecha_Pedido}</td>
                    <td>{p.Fecha_Entrega_Esperada}</td>
                    <td>
                      <Badge bg={colorEstado(p.Estado)}>{p.Estado}</Badge>
                    </td>
                    <td>$ {p.Total_COP}</td>
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
                        onClick={() => handleDelete(p.id_pedido)}
                      >
                        🗑️ Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No se encontraron resultados.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card>
    </Container>
  );
}
