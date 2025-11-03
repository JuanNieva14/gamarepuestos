import React, { useState, useEffect } from "react";
import { Container, Card, Table, Form, Row, Col, Badge, Spinner } from "react-bootstrap";
import { obtenerProductos } from "../services/consulta_productoService";

export default function Consulta_Productos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos(busqueda, categoriaFiltro, estadoFiltro);
      setProductos(data);
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => cargarProductos(), 400);
    return () => clearTimeout(timeout);
  }, [busqueda, categoriaFiltro, estadoFiltro]);

  const getBadge = (estado) => {
    switch (estado) {
      case "Activo":
        return <Badge bg="success">Activo</Badge>;
      case "Agotado":
        return <Badge bg="danger">Agotado</Badge>;
      case "En Pedido":
        return <Badge bg="warning" text="dark">En Pedido</Badge>;
      default:
        return <Badge bg="secondary">{estado}</Badge>;
    }
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Listado de Productos</h2>

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
                <option value="En Pedido">En Pedido</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>

        {cargando ? (
          <div className="text-center mt-3">
            <Spinner animation="border" variant="light" /> Cargando productos...
          </div>
        ) : (
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
              {productos.length > 0 ? (
                productos.map((p) => (
                  <tr key={p.id_producto}>
                    <td>{p.id_producto}</td>
                    <td>{p.nombre}</td>
                    <td>{p.categoria}</td>
                    <td>${p.precio?.toLocaleString("es-CO")}</td>
                    <td>{p.stock ?? 0}</td>
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
        )}
      </Card>
    </Container>
  );
}
