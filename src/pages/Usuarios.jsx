import React, { useState } from "react";
import { Container, Card, Table, Button, Form, Row, Col, Badge } from "react-bootstrap";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan Pérez", correo: "juanp@gama.com", rol: "Administrador", estado: "Activo" },
    { id: 2, nombre: "María Gómez", correo: "maria@gama.com", rol: "Vendedor", estado: "Activo" },
    { id: 3, nombre: "Carlos López", correo: "carlos@gama.com", rol: "Auxiliar", estado: "Inactivo" },
  ]);

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    correo: "",
    rol: "Vendedor",
    estado: "Activo",
  });

  const handleChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!nuevoUsuario.nombre || !nuevoUsuario.correo) return;
    const nuevo = {
      id: usuarios.length + 1,
      ...nuevoUsuario,
    };
    setUsuarios([...usuarios, nuevo]);
    setNuevoUsuario({ nombre: "", correo: "", rol: "Vendedor", estado: "Activo" });
  };

  const toggleEstado = (id) => {
    const actualizados = usuarios.map((u) =>
      u.id === id ? { ...u, estado: u.estado === "Activo" ? "Inactivo" : "Activo" } : u
    );
    setUsuarios(actualizados);
  };

  const eliminarUsuario = (id) => {
    if (confirm("¿Deseas eliminar este usuario?")) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
    }
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Gestión de Usuarios y Roles</h2>

        {/* 🔹 Formulario */}
        <Form onSubmit={handleAgregar} className="mb-4">
          <Row className="g-3 align-items-end">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={nuevoUsuario.nombre}
                  onChange={handleChange}
                  placeholder="Nombre completo"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  name="correo"
                  value={nuevoUsuario.correo}
                  onChange={handleChange}
                  placeholder="usuario@correo.com"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label>Rol</Form.Label>
                <Form.Select
                  name="rol"
                  value={nuevoUsuario.rol}
                  onChange={handleChange}
                >
                  <option>Administrador</option>
                  <option>Vendedor</option>
                  <option>Auxiliar</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Button type="submit" variant="danger" className="w-100">
                Agregar
              </Button>
            </Col>
          </Row>
        </Form>

        {/* 📋 Tabla */}
        <Table striped bordered hover variant="dark" responsive className="text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>
                  <Badge
                    bg={
                      u.rol === "Administrador"
                        ? "danger"
                        : u.rol === "Vendedor"
                        ? "info"
                        : "secondary"
                    }
                  >
                    {u.rol}
                  </Badge>
                </td>
                <td>
                  <Badge bg={u.estado === "Activo" ? "success" : "secondary"}>
                    {u.estado}
                  </Badge>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant={u.estado === "Activo" ? "outline-warning" : "outline-success"}
                    className="me-2"
                    onClick={() => toggleEstado(u.id)}
                  >
                    {u.estado === "Activo" ? "Desactivar" : "Activar"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => eliminarUsuario(u.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* 📊 Estadísticas rápidas */}
        <div className="mt-4 text-end">
          <h6>Total de usuarios: <span className="text-warning">{usuarios.length}</span></h6>
          <h6>
            Activos:{" "}
            <span className="text-success">
              {usuarios.filter((u) => u.estado === "Activo").length}
            </span>{" "}
            | Inactivos:{" "}
            <span className="text-secondary">
              {usuarios.filter((u) => u.estado === "Inactivo").length}
            </span>
          </h6>
        </div>
      </Card>
    </Container>
  );
}
