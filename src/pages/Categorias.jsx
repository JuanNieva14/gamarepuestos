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
  Modal,
} from "react-bootstrap";
import axios from "axios";

export default function CategoriasClasificaciones() {
  const API_CAT = "http://localhost:8001/categorias";
  const API_CLA = "http://localhost:8001/clasificaciones";

  const [tipoVista, setTipoVista] = useState("categoria");
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState(""); // ← Barra vacía por defecto
  const [mensaje, setMensaje] = useState(null);
  const [tipoMsg, setTipoMsg] = useState("success");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [formCategoria, setFormCategoria] = useState({ nombre_categoria: "", activo: 1 });
  const [formClasificacion, setFormClasificacion] = useState({
    nombre_clasificacion: "",
    tipo: "",
    activo: 1,
  });
  const [cargando, setCargando] = useState(false);
  const [editId, setEditId] = useState(null);

  const showMsg = (texto, tipo = "success", ms = 2500) => {
    setMensaje(texto);
    setTipoMsg(tipo);
    setTimeout(() => setMensaje(null), ms);
  };

  const listar = async () => {
    try {
      const res =
        tipoVista === "categoria"
          ? await axios.get(API_CAT)
          : await axios.get(API_CLA);
      setData(res.data);
    } catch {
      showMsg("Error al cargar los datos.", "danger");
    }
  };

  useEffect(() => {
    listar();
  }, [tipoVista]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      if (tipoVista === "categoria") {
        if (editId) {
          await axios.put(`${API_CAT}/${editId}`, formCategoria);
          showMsg("Categoría actualizada correctamente.");
        } else {
          await axios.post(API_CAT, formCategoria);
          showMsg("Categoría creada correctamente.");
        }
      } else {
        if (editId) {
          await axios.put(`${API_CLA}/${editId}`, formClasificacion);
          showMsg("Clasificación actualizada correctamente.");
        } else {
          await axios.post(API_CLA, formClasificacion);
          showMsg("Clasificación creada correctamente.");
        }
      }
      setMostrarModal(false);
      setFormCategoria({ nombre_categoria: "", activo: 1 });
      setFormClasificacion({ nombre_clasificacion: "", tipo: "", activo: 1 });
      setEditId(null);
      listar();
    } catch (error) {
      console.error("Error:", error);
      showMsg("Error al registrar.", "danger");
    } finally {
      setCargando(false);
    }
  };

  const desactivar = async (id) => {
    if (!window.confirm("¿Deseas desactivar este registro?")) return;
    try {
      if (tipoVista === "categoria") {
        await axios.delete(`${API_CAT}/${id}`);
      } else {
        await axios.put(`${API_CLA}/desactivar/${id}`);
      }
      showMsg("Desactivado correctamente.");
      listar();
    } catch {
      showMsg("Error al desactivar.", "danger");
    }
  };

  const activar = async (id) => {
    try {
      if (tipoVista === "categoria") {
        await axios.put(`${API_CAT}/activar/${id}`);
      } else {
        await axios.put(`${API_CLA}/activar/${id}`);
      }
      showMsg("Activado correctamente.");
      listar();
    } catch {
      showMsg("Error al activar.", "danger");
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este registro permanentemente?")) return;
    try {
      if (tipoVista === "categoria") {
        await axios.delete(`${API_CAT}/eliminar/${id}`);
      } else {
        await axios.delete(`${API_CLA}/eliminar/${id}`);
      }
      showMsg("Eliminado correctamente.");
      listar();
    } catch {
      showMsg("Error al eliminar.", "danger");
    }
  };

  const editar = (item) => {
    setEditId(item.id_categoria || item.id_clasificacion);
    if (tipoVista === "categoria") {
      setFormCategoria({
        nombre_categoria: item.nombre_categoria,
        activo: item.activo,
      });
    } else {
      setFormClasificacion({
        nombre_clasificacion: item.nombre_clasificacion,
        tipo: item.tipo,
        activo: item.activo,
      });
    }
    setMostrarModal(true);
  };

  const filtrados = (data || []).filter((d) => {
    const nombre =
      tipoVista === "categoria"
        ? (d?.nombre_categoria ?? "")
        : (d?.nombre_clasificacion ?? "");
    return nombre.toLowerCase().includes(busqueda.toLowerCase());
  });

  const normalizados = filtrados.map((d) =>
    typeof d.activo === "number" ? d : { ...d, activo: 1 }
  );

  const activos = normalizados.filter((d) => d.activo === 1);
  const inactivos = normalizados.filter((d) => d.activo === 0);

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">
          Gestión de Categorías y Clasificaciones
        </h2>

        {mensaje && (
          <Alert variant={tipoMsg} className="text-center fw-bold">
            {mensaje}
          </Alert>
        )}

        {/* Barra superior */}
        <Row className="mb-4 align-items-center">
          <Col md={4}>
            <Form.Select
              value={tipoVista}
              onChange={(e) => {
                setTipoVista(e.target.value);
                setBusqueda(""); // Limpia búsqueda al cambiar vista
              }}
              className="bg-dark text-white border-danger"
            >
              <option value="categoria">Categorías</option>
              <option value="clasificacion">Clasificaciones</option>
            </Form.Select>
          </Col>

          <Col md={5}>
            <InputGroup>
              <Form.Control
                placeholder={`Buscar ${
                  tipoVista === "categoria" ? "categoría" : "clasificación"
                }...`}
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="bg-dark text-white border-danger"
              />
              <Button
                variant="outline-danger"
                onClick={() => setBusqueda("")}
              >
                Limpiar
              </Button>
            </InputGroup>
          </Col>

          <Col md={3} className="text-end">
            <Button
              variant="danger"
              className="fw-bold"
              onClick={() => {
                setMostrarModal(true);
                setEditId(null);
              }}
            >
              + Registrar
            </Button>
          </Col>
        </Row>

        {/* Tabla de Activos */}
        <h5 className="text-light mt-2 mb-2">Registros Activos</h5>
        <div className="table-responsive">
          <Table striped bordered hover variant="dark" className="text-center align-middle">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>ID</th>
                <th style={{ width: tipoVista === "clasificacion" ? "45%" : "70%" }}>Nombre</th>
                <th style={{ width: "20%" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {activos.length === 0 ? (
                <tr>
                  <td colSpan={tipoVista === "clasificacion" ? 4 : 3}>
                    No hay registros activos
                  </td>
                </tr>
              ) : (
                activos.map((item) => (
                  <tr key={item.id_categoria || item.id_clasificacion}>
                    <td>{item.id_categoria || item.id_clasificacion}</td>
                    <td>{item.nombre_categoria || item.nombre_clasificacion}</td> 
                    <td>
                      <Button
                        size="sm"
                        variant="outline-warning"
                        className="me-2"
                        onClick={() => editar(item)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() =>
                          desactivar(item.id_categoria || item.id_clasificacion)
                        }
                      >
                        Desactivar
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>

        {/* Tabla de Inactivos */}
        <h5 className="text-light mt-4 mb-2">Registros Inactivos</h5>
        <div className="table-responsive">
          <Table striped bordered hover variant="dark" className="text-center align-middle">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>ID</th>
                <th style={{ width: tipoVista === "clasificacion" ? "45%" : "70%" }}>Nombre</th>
                <th style={{ width: "20%" }}>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {inactivos.length === 0 ? (
                <tr>
                  <td colSpan={tipoVista === "clasificacion" ? 4 : 3}>
                    No hay registros inactivos
                  </td>
                </tr>
              ) : (
                inactivos.map((item) => (
                  <tr key={item.id_categoria || item.id_clasificacion}>
                    <td>{item.id_categoria || item.id_clasificacion}</td>
                    <td>{item.nombre_categoria || item.nombre_clasificacion}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline-success"
                        className="me-2"
                        onClick={() =>
                          activar(item.id_categoria || item.id_clasificacion)
                        }
                      >
                        Activar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() =>
                          eliminar(item.id_categoria || item.id_clasificacion)
                        }
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>

        {/* Modal */}
        <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>
              {editId ? "Editar" : "Registrar"}{" "}
              {tipoVista === "categoria" ? "Categoría" : "Clasificación"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            <Form onSubmit={handleSubmit}>
              {tipoVista === "categoria" ? (
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de la Categoría</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre_categoria"
                    value={formCategoria.nombre_categoria}
                    onChange={(e) =>
                      setFormCategoria({
                        ...formCategoria,
                        nombre_categoria: e.target.value,
                      })
                    }
                    className="bg-dark text-white border-danger"
                    required
                  />
                </Form.Group>
              ) : (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre de la Clasificación</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre_clasificacion"
                      value={formClasificacion.nombre_clasificacion}
                      onChange={(e) =>
                        setFormClasificacion({
                          ...formClasificacion,
                          nombre_clasificacion: e.target.value,
                        })
                      }
                      className="bg-dark text-white border-danger"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control
                      type="text"
                      name="tipo"
                      value={formClasificacion.tipo}
                      onChange={(e) =>
                        setFormClasificacion({
                          ...formClasificacion,
                          tipo: e.target.value,
                        })
                      }
                      className="bg-dark text-white border-danger"
                      required
                    />
                  </Form.Group>
                </>
              )}
              <div className="text-center">
                <Button
                  type="submit"
                  variant="danger"
                  className="fw-bold px-4"
                  disabled={cargando}
                >
                  {cargando ? <Spinner size="sm" animation="border" /> : "Guardar"}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Card>
    </Container>
  );
}
