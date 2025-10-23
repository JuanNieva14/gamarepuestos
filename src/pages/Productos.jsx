import React, { useState } from "react";
import { Container, Card, Table, Form, Row, Col, Badge } from "react-bootstrap";

export default function Productos() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");

  const productos = [
    { id: 1, nombre: "Aceite 20W50", categoria: "Lubricantes", precio: 25000, stock: 40, estado: "Activo" },
    { id: 2, nombre: "Bujía NGK", categoria: "Motor", precio: 18000, stock: 25, estado: "Activo" },
    { id: 3, nombre: "Pastillas de freno", categoria: "Frenos", precio: 32000, stock: 10, estado: "Agotado" },
    { id: 4, nombre: "Cadena reforzada", categoria: "Transmisión", precio: 60000, stock: 7, estado: "En pedido" },
    { id: 5, nombre: "Llanta 120/70 R17", categoria: "Llantas", precio: 180000, stock: 5, estado: "Activo" },
    { id: 6, nombre: "Filtro de aire", categoria: "Motor", precio: 27000, stock: 12, estado: "Activo" },
    { id: 7, nombre: "Disco de freno", categoria: "Frenos", precio: 85000, stock: 4, estado: "Agotado" },
    { id: 8, nombre: "Grasa lubricante", categoria: "Lubricantes", precio: 15000, stock: 20, estado: "Activo" },
    { id: 9, nombre: "Kit de transmisión", categoria: "Transmisión", precio: 220000, stock: 8, estado: "Activo" },
    { id: 10, nombre: "Espejos laterales", categoria: "Accesorios", precio: 40000, stock: 15, estado: "Activo" },
  ];

  // Filtros dinámicos
  const productosFiltrados = productos.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaFiltro ? p.categoria === categoriaFiltro : true;
    const coincideEstado = estadoFiltro ? p.estado === estadoFiltro : true;
    return coincideNombre && coincideCategoria && coincideEstado;
  });

  const getBadge = (estado) => {
    switch (estado) {
      case "Activo":
        return <Badge bg="success">Activo</Badge>;
      case "Agotado":
        return <Badge bg="danger">Agotado</Badge>;
      case "En pedido":
        return <Badge bg="warning" text="dark">En Pedido</Badge>;
      default:
        return <Badge bg="secondary">{estado}</Badge>;
    }
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Listado de Productos</h2>

        {/* 🔍 Búsqueda y Filtros */}
        <Form className="mb-4">
          <Row className="g-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Select
                value={categoriaFiltro}
                onChange={(e) => setCategoriaFiltro(e.target.value)}
              >
                <option value="">Filtrar por categoría</option>
                <option value="Lubricantes">Lubricantes</option>
                <option value="Motor">Motor</option>
                <option value="Frenos">Frenos</option>
                <option value="Transmisión">Transmisión</option>
                <option value="Llantas">Llantas</option>
                <option value="Accesorios">Accesorios</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Select
                value={estadoFiltro}
                onChange={(e) => setEstadoFiltro(e.target.value)}
              >
                <option value="">Filtrar por estado</option>
                <option value="Activo">Activo</option>
                <option value="Agotado">Agotado</option>
                <option value="En pedido">En Pedido</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>

        {/* 📋 Tabla de productos */}
        <Table striped bordered hover variant="dark" responsive className="text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio (COP)</th>
              <th>Stock</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>${p.precio.toLocaleString()}</td>
                  <td>{p.stock}</td>
                  <td>{getBadge(p.estado)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
