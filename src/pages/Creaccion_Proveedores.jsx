import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Table,
  Form,
  Row,
  Col,
  Button,
  Badge,
  Modal,
  Spinner,
} from "react-bootstrap";
import {
  obtenerProveedores,
  crearProveedor,
  editarProveedor,
  eliminarProveedor,
} from "../services/consulta_proveedores";

export default function ConsultaProveedores() {
  const [busqueda, setBusqueda] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [proveedorActual, setProveedorActual] = useState({
    id_proveedor: null,
    nit: "",
    nombre: "",
    apellido: "",
    tipo_documento: "CC",
    numero_documento: "",
    correo: "",
    direccion: "",
    id_ciudad: 1, // por defecto
  });

  // 🔄 Cargar proveedores
  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        const data = await obtenerProveedores();
        setProveedores(data);
      } catch (error) {
        alert("Error al cargar proveedores: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

    // 🔍 Filtrado por búsqueda (corrige búsqueda por cédula o número)
    const proveedoresFiltrados = proveedores.filter((p) => {
      const texto = `
        ${p.nit ?? ""}
        ${p.nombre_completo ?? ""}
        ${p.tipo_documento ?? ""}
        ${p.numero_documento ?? ""}
        ${p.correo ?? ""}
        ${p.direccion ?? ""}
        ${p.ciudad ?? ""}
      `.toLowerCase();
      return texto.includes(busqueda.toLowerCase());
    });


  // 📋 Guardar nuevo o editar
  const handleGuardar = async () => {
    if (
      !proveedorActual.nit ||
      !proveedorActual.nombre ||
      !proveedorActual.apellido ||
      !proveedorActual.numero_documento ||
      !proveedorActual.correo ||
      !proveedorActual.direccion
    ) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    try {
      if (modoEdicion) {
        await editarProveedor(proveedorActual.id_proveedor, proveedorActual);
        alert("Proveedor actualizado correctamente.");
      } else {
        await crearProveedor(proveedorActual);
        alert("Proveedor agregado correctamente.");
      }

      setShowModal(false);
      setModoEdicion(false);
      setProveedorActual({
        id_proveedor: null,
        nit: "",
        nombre: "",
        apellido: "",
        tipo_documento: "CC",
        numero_documento: "",
        correo: "",
        direccion: "",
        id_ciudad: 1,
      });

      const data = await obtenerProveedores();
      setProveedores(data);
    } catch (error) {
      alert("Error al guardar: " + error.message);
    }
  };

  // ✏️ Editar proveedor
  const handleEditar = (proveedor) => {
    setProveedorActual({
      id_proveedor: proveedor.id_proveedor,
      nit: proveedor.nit,
      nombre: proveedor.nombre_completo.split(" ")[0],
      apellido: proveedor.nombre_completo.split(" ").slice(1).join(" "),
      tipo_documento: proveedor.tipo_documento,
      numero_documento: proveedor.numero_documento,
      correo: proveedor.correo,
      direccion: proveedor.direccion,
      id_ciudad: 1,
    });
    setModoEdicion(true);
    setShowModal(true);
  };

  // 🗑️ Eliminar proveedor
  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este proveedor?")) {
      try {
        await eliminarProveedor(id);
        alert("Proveedor eliminado correctamente.");
        setProveedores(proveedores.filter((p) => p.id_proveedor !== id));
      } catch (error) {
        alert("Error al eliminar: " + error.message);
      }
    }
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Consulta de Proveedores</h2>

        {/* 🔍 Búsqueda */}
        <Row className="mb-3">
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre, NIT o ciudad..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Col>
          <Col md={4} className="text-md-end mt-2 mt-md-0">
            <Button
              variant="danger"
              onClick={() => {
                setShowModal(true);
                setModoEdicion(false);
                setProveedorActual({
                  id_proveedor: null,
                  nit: "",
                  nombre: "",
                  apellido: "",
                  tipo_documento: "CC",
                  numero_documento: "",
                  correo: "",
                  direccion: "",
                  id_ciudad: 1,
                });
              }}
            >
              ➕ Agregar Proveedor
            </Button>
          </Col>
        </Row>

        {/* 📋 Tabla */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <Table striped bordered hover variant="dark" responsive className="text-center">
            <thead>
              <tr>
                <th>NIT</th>
                <th>Nombre Completo</th>
                <th>Tipo Documento</th>
                <th>Documento</th>
                <th>Correo</th>
                <th>Dirección</th>
                <th>Ciudad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedoresFiltrados.length > 0 ? (
                proveedoresFiltrados.map((p) => (
                  <tr key={p.id_proveedor}>
                    <td>{p.nit}</td>
                    <td>{p.nombre_completo}</td>
                    <td>{p.tipo_documento}</td>
                    <td>{p.numero_documento}</td>
                    <td>{p.correo}</td>
                    <td>{p.direccion}</td>
                    <td>{p.ciudad || "Sin ciudad"}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline-light"
                        className="me-2"
                        onClick={() => handleEditar(p)}
                      >
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleEliminar(p.id_proveedor)}
                      >
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center text-muted">
                    No se encontraron proveedores.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          
        )}
        
      </Card>

      {/* 🧾 Modal de Registro / Edición */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? "Editar Proveedor" : "Agregar Proveedor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>NIT</Form.Label>
              <Form.Control
                type="text"
                value={proveedorActual.nit}
                onChange={(e) => setProveedorActual({ ...proveedorActual, nit: e.target.value })}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={proveedorActual.nombre}
                    onChange={(e) =>
                      setProveedorActual({ ...proveedorActual, nombre: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    value={proveedorActual.apellido}
                    onChange={(e) =>
                      setProveedorActual({ ...proveedorActual, apellido: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de Documento</Form.Label>
                  <Form.Select
                    value={proveedorActual.tipo_documento}
                    onChange={(e) =>
                      setProveedorActual({ ...proveedorActual, tipo_documento: e.target.value })
                    }
                  >
                    <option value="CC">Cédula</option>
                    <option value="NIT">NIT</option>
                    <option value="CE">Cédula Extranjería</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Número de Documento</Form.Label>
                  <Form.Control
                    type="text"
                    value={proveedorActual.numero_documento}
                    onChange={(e) =>
                      setProveedorActual({ ...proveedorActual, numero_documento: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                value={proveedorActual.correo}
                onChange={(e) =>
                  setProveedorActual({ ...proveedorActual, correo: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                value={proveedorActual.direccion}
                onChange={(e) =>
                  setProveedorActual({ ...proveedorActual, direccion: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleGuardar}>
            💾 Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
