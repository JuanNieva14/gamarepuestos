import React, { useState } from "react";
import { Container, Card, Table, Form, Row, Col, Button, Badge, Modal } from "react-bootstrap";

export default function Clientes() {
  const [busqueda, setBusqueda] = useState("");
  const [clientes, setClientes] = useState([
    { id: 1, nombre: "Juan Pérez", contacto: "3214567890", correo: "juanperez@gmail.com", estado: "Activo" },
    { id: 2, nombre: "María Rodríguez", contacto: "3129876543", correo: "maria_rod@gmail.com", estado: "Activo" },
    { id: 3, nombre: "Carlos Ramírez", contacto: "3206549871", correo: "carlosramirez@hotmail.com", estado: "Inactivo" },
    { id: 4, nombre: "Ana Torres", contacto: "3102223344", correo: "anatorres@yahoo.com", estado: "Activo" },
    { id: 5, nombre: "Pedro Gómez", contacto: "3159871234", correo: "pedrogomez@gmail.com", estado: "Activo" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [clienteActual, setClienteActual] = useState({
    id: null,
    nombre: "",
    contacto: "",
    correo: "",
    estado: "Activo",
  });

  // 🔍 Filtrado
  const clientesFiltrados = clientes.filter((c) =>
    [c.nombre, c.contacto, c.correo].some((campo) =>
      campo.toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  const getBadge = (estado) =>
    estado === "Activo" ? <Badge bg="success">Activo</Badge> : <Badge bg="secondary">Inactivo</Badge>;

  // 💾 Guardar / Editar
  const handleGuardar = () => {
    if (!clienteActual.nombre || !clienteActual.contacto || !clienteActual.correo) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (modoEdicion) {
      setClientes(
        clientes.map((c) =>
          c.id === clienteActual.id ? clienteActual : c
        )
      );
    } else {
      setClientes([
        ...clientes,
        { ...clienteActual, id: clientes.length + 1 },
      ]);
    }

    setShowModal(false);
    setClienteActual({ id: null, nombre: "", contacto: "", correo: "", estado: "Activo" });
    setModoEdicion(false);
  };

  // 🗑️ Eliminar
  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este cliente?")) {
      setClientes(clientes.filter((c) => c.id !== id));
    }
  };

  // ✏️ Editar
  const handleEditar = (cliente) => {
    setClienteActual(cliente);
    setModoEdicion(true);
    setShowModal(true);
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Gestión de Clientes</h2>

        {/* 🔍 Búsqueda */}
        <Row className="mb-3">
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre, contacto o correo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Col>
          <Col md={4} className="text-md-end mt-2 mt-md-0">
            <Button variant="danger" onClick={() => setShowModal(true)}>
              ➕ Agregar Cliente
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
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nombre}</td>
                  <td>{c.contacto}</td>
                  <td>{c.correo}</td>
                  <td>{getBadge(c.estado)}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-light"
                      className="me-2"
                      onClick={() => handleEditar(c)}
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleEliminar(c.id)}
                    >
                      🗑️ Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No se encontraron clientes.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* 🧾 Modal Agregar / Editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? "Editar Cliente" : "Agregar Cliente"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                value={clienteActual.nombre}
                onChange={(e) =>
                  setClienteActual({ ...clienteActual, nombre: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contacto (Teléfono)</Form.Label>
              <Form.Control
                type="text"
                value={clienteActual.contacto}
                onChange={(e) =>
                  setClienteActual({ ...clienteActual, contacto: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                value={clienteActual.correo}
                onChange={(e) =>
                  setClienteActual({ ...clienteActual, correo: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                value={clienteActual.estado}
                onChange={(e) =>
                  setClienteActual({ ...clienteActual, estado: e.target.value })
                }
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
