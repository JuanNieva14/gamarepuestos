import React, { useState } from "react";
import { Container, Card, Table, Form, Row, Col, Button, Badge, Modal } from "react-bootstrap";

export default function Proveedores() {
  const [busqueda, setBusqueda] = useState("");
  const [proveedores, setProveedores] = useState([
    { id: 1, nombre: "MotoRepuestos Chocó", contacto: "Carlos Gómez", correo: "carlos@motochoco.com", ciudad: "Quibdó", estado: "Activo" },
    { id: 2, nombre: "Lubricantes Colombia", contacto: "Laura Ríos", correo: "laura@lubcol.com", ciudad: "Medellín", estado: "Activo" },
    { id: 3, nombre: "Accesorios Motos S.A", contacto: "Jorge Pardo", correo: "jorge@accesoriosmotos.com", ciudad: "Cali", estado: "Inactivo" },
    { id: 4, nombre: "Repuestos del Norte", contacto: "Sofía Herrera", correo: "sofia@repnorte.com", ciudad: "Cúcuta", estado: "Activo" },
    { id: 5, nombre: "MotoZone Import", contacto: "Ricardo Díaz", correo: "ricardo@motozone.com", ciudad: "Bogotá", estado: "Activo" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [proveedorActual, setProveedorActual] = useState({ id: null, nombre: "", contacto: "", correo: "", ciudad: "", estado: "Activo" });

  // 🧭 Filtrar búsqueda
  const proveedoresFiltrados = proveedores.filter((p) =>
    [p.nombre, p.contacto, p.correo, p.ciudad].some((campo) =>
      campo.toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  const getBadge = (estado) =>
    estado === "Activo" ? <Badge bg="success">Activo</Badge> : <Badge bg="secondary">Inactivo</Badge>;

  // ➕ Agregar o Editar
  const handleGuardar = () => {
    if (!proveedorActual.nombre || !proveedorActual.contacto || !proveedorActual.correo || !proveedorActual.ciudad) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (modoEdicion) {
      setProveedores(
        proveedores.map((p) =>
          p.id === proveedorActual.id ? proveedorActual : p
        )
      );
    } else {
      setProveedores([
        ...proveedores,
        { ...proveedorActual, id: proveedores.length + 1 },
      ]);
    }

    setShowModal(false);
    setProveedorActual({ id: null, nombre: "", contacto: "", correo: "", ciudad: "", estado: "Activo" });
    setModoEdicion(false);
  };

  // 🗑️ Eliminar
  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este proveedor?")) {
      setProveedores(proveedores.filter((p) => p.id !== id));
    }
  };

  // ✏️ Editar
  const handleEditar = (proveedor) => {
    setProveedorActual(proveedor);
    setModoEdicion(true);
    setShowModal(true);
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Gestión de Proveedores</h2>

        {/* 🔍 Búsqueda */}
        <Row className="mb-3">
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre, correo o ciudad..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Col>
          <Col md={4} className="text-md-end mt-2 mt-md-0">
            <Button variant="danger" onClick={() => setShowModal(true)}>
              ➕ Agregar Proveedor
            </Button>
          </Col>
        </Row>

        {/* 📋 Tabla */}
        <Table striped bordered hover variant="dark" responsive className="text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Correo</th>
              <th>Ciudad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedoresFiltrados.length > 0 ? (
              proveedoresFiltrados.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.contacto}</td>
                  <td>{p.correo}</td>
                  <td>{p.ciudad}</td>
                  <td>{getBadge(p.estado)}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-light"
                      className="me-2"
                      onClick={() => handleEditar(p)}
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleEliminar(p.id)}
                    >
                      🗑️ Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No se encontraron proveedores.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* 🧾 Modal de Registro / Edición */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? "Editar Proveedor" : "Agregar Proveedor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={proveedorActual.nombre}
                onChange={(e) => setProveedorActual({ ...proveedorActual, nombre: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contacto</Form.Label>
              <Form.Control
                type="text"
                value={proveedorActual.contacto}
                onChange={(e) => setProveedorActual({ ...proveedorActual, contacto: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                value={proveedorActual.correo}
                onChange={(e) => setProveedorActual({ ...proveedorActual, correo: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                value={proveedorActual.ciudad}
                onChange={(e) => setProveedorActual({ ...proveedorActual, ciudad: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                value={proveedorActual.estado}
                onChange={(e) => setProveedorActual({ ...proveedorActual, estado: e.target.value })}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Form.Select>
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
