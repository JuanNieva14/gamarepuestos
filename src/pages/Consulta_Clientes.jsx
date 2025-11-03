import React, { useState, useEffect } from "react";
import { Container, Card, Table, Form, Row, Col, Badge, Spinner } from "react-bootstrap";
import { obtenerClientes } from "../services/consulta_Clientes";

export default function Consulta_Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      setCargando(true);
      const data = await obtenerClientes(busqueda);
      setClientes(data);
    } catch (error) {
      console.error("❌ Error al cargar clientes:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      cargarClientes();
    }, 400);
    return () => clearTimeout(timeout);
  }, [busqueda]);

  const getBadge = (estado) =>
    estado === "Activo" ? <Badge bg="success">Activo</Badge> : <Badge bg="secondary">Inactivo</Badge>;

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Consulta de Clientes</h2>

        {/* 🔍 Búsqueda */}
        <Row className="mb-4">
          <Col md={12}>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre, identificacion o correo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Col>
        </Row>

        {/* 📋 Tabla */}
        {cargando ? (
          <div className="text-center text-light mt-3">
            <Spinner animation="border" variant="light" /> Cargando clientes...
          </div>
        ) : (
          <Table striped bordered hover variant="dark" responsive className="text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Identificacion</th>
                <th>Correo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {clientes.length > 0 ? (
                clientes.map((c) => (
                  <tr key={c.id_cliente}>
                    <td>{c.id_cliente}</td>
                    <td>{c.nombre}</td>
                    <td>{c.documento}</td>
                    <td>{c.correo}</td>
                    <td>{getBadge(c.estado)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No se encontraron clientes.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
}
