import React, { useEffect, useState } from "react";
import { Container, Card, Table, Form, Row, Col, Button, Spinner, Pagination } from "react-bootstrap";
import { obtenerInventario } from "../services/inventario_reporte";

export default function InventarioGeneral() {
  const [inventario, setInventario] = useState({ data: [], total_pages: 1 });
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroClasificacion, setFiltroClasificacion] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [page, setPage] = useState(1);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      const datos = await obtenerInventario(page, 10);
      setInventario(datos);
      setCargando(false);
    };
    cargarDatos();
  }, [page]);

  // 🔍 Filtros
  const inventarioFiltrado = inventario.data.filter((item) => {
    const coincideCategoria = filtroCategoria ? item.categoria === filtroCategoria : true;
    const coincideClasificacion = filtroClasificacion ? item.clasificacion === filtroClasificacion : true;
    const coincideBusqueda =
      item.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.codigo.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideClasificacion && coincideBusqueda;
  });

  // 🧾 Listas únicas
  const categorias = [...new Set(inventario.data.map((i) => i.categoria))];
  const clasificaciones = [...new Set(inventario.data.map((i) => i.clasificacion))];

  // 🖨️
  const handleImprimir = () => window.print();

  // 🔢 Crear paginador numérico
  const crearPaginacion = () => {
    let items = [];
    for (let number = 1; number <= inventario.total_pages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => setPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Inventario General</h2>

        {/* 🔍 FILTROS */}
        <Row className="g-3 mb-3 justify-content-center">
          <Col md={3}>
            <Form.Select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
              <option value="">Todas las Categorías</option>
              {categorias.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Select value={filtroClasificacion} onChange={(e) => setFiltroClasificacion(e.target.value)}>
              <option value="">Todas las Clasificaciones</option>
              {clasificaciones.map((cl, i) => (
                <option key={i} value={cl}>{cl}</option>
              ))}
            </Form.Select>
          </Col>

          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre o código..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Col>
        </Row>

        {/* 📋 TABLA */}
        {cargando ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="light" />
            <p className="mt-2">Cargando inventario...</p>
          </div>
        ) : inventarioFiltrado.length > 0 ? (
          <Table striped bordered hover variant="dark" responsive className="text-center">
            <thead>
              <tr>
                <th>Código</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Clasificación</th>
                <th>Estado</th>
                <th>Stock Actual</th>
                <th>Stock Mínimo</th>
                <th>Precio Compra</th>
                <th>Precio Venta</th>
                <th>Margen (%)</th>
                <th>Fecha Actualización</th>
              </tr>
            </thead>
            <tbody>
              {inventarioFiltrado.map((item, index) => (
                <tr key={index}>
                  <td>{item.codigo}</td>
                  <td>{item.producto}</td>
                  <td>{item.categoria}</td>
                  <td>{item.clasificacion}</td>
                  <td>{item.estado}</td>
                  <td>{item.stock_actual}</td>
                  <td>{item.stock_minimo}</td>
                  <td>${item.precio_compra.toLocaleString()}</td>
                  <td>${item.precio_venta.toLocaleString()}</td>
                  <td>{item.margen}%</td>
                  <td>{item.fecha_actualizacion}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center text-muted">No se encontraron productos.</p>
        )}

        {/* 🔢 PAGINACIÓN */}
        {inventario.total_pages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <Pagination className="mb-0">{crearPaginacion()}</Pagination>
          </div>
        )}

        {/* 🖨️ BOTÓN */}
        <div className="text-center mt-3">
          <Button variant="outline-light" onClick={handleImprimir}>
            🖨️ Imprimir Inventario
          </Button>
        </div>
      </Card>
    </Container>
  );
}
