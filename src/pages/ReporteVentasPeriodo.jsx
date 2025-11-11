import React, { useEffect, useState } from "react";
import { Container, Card, Table, Spinner, Form, Row, Col, Button } from "react-bootstrap";
import { obtenerVentasPorMes } from "../services/ventas_por_mes";

export default function VentasPorMes() {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroAnio, setFiltroAnio] = useState("");
  const [filtroMes, setFiltroMes] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      const datos = await obtenerVentasPorMes();
      setVentas(datos);
      setCargando(false);
    };
    cargarDatos();
  }, []);

  // 📅 Filtrado por año y mes en español
  const ventasFiltradas = ventas.filter((v) => {
    const [mesTexto, anioTexto] = v.mes.split(" "); // "Octubre 2025"
    const coincideAnio = filtroAnio ? anioTexto === filtroAnio : true;
    const coincideMes = filtroMes
      ? mesTexto.toLowerCase() === filtroMes.toLowerCase()
      : true;
    return coincideAnio && coincideMes;
  });

  // 📆 Años disponibles dinámicamente
  const aniosDisponibles = [
    ...new Set(ventas.map((v) => v.mes.split(" ")[1]))
  ].sort((a, b) => b - a);

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">📊 Ventas por Mes</h2>

        {/* 🔍 Filtros */}
        <Form className="mb-4">
          <Row className="g-3 justify-content-center">
            <Col xs={12} md={3}>
              <Form.Select
                value={filtroAnio}
                onChange={(e) => setFiltroAnio(e.target.value)}
              >
                <option value="">Filtrar por año</option>
                {aniosDisponibles.map((anio) => (
                  <option key={anio} value={anio}>
                    {anio}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col xs={12} md={3}>
              <Form.Select
                value={filtroMes}
                onChange={(e) => setFiltroMes(e.target.value)}
              >
                <option value="">Filtrar por mes</option>
                {meses.map((mes) => (
                  <option key={mes} value={mes}>
                    {mes}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col xs={12} md={2}>
              <Button
                variant="outline-danger"
                onClick={() => {
                  setFiltroAnio("");
                  setFiltroMes("");
                }}
              >
                🔄 Limpiar
              </Button>
            </Col>
          </Row>
        </Form>

        {/* 📋 Tabla */}
        {cargando ? (
          <div className="text-center">
            <Spinner animation="border" variant="light" />
            <p className="mt-2">Cargando datos...</p>
          </div>
        ) : ventasFiltradas.length > 0 ? (
          <Table striped bordered hover variant="dark" responsive className="text-center">
            <thead>
              <tr>
                <th>Mes</th>
                <th>Subtotal</th>
                <th>IVA</th>
                <th>Descuento</th>
                <th>Total General</th>
                <th>N° Facturas</th>
              </tr>
            </thead>
            <tbody>
              {ventasFiltradas.map((v, i) => (
                <tr key={i}>
                  <td>{v.mes}</td>
                  <td>${v.subtotal_total.toLocaleString()}</td>
                  <td>${v.impuesto_total.toLocaleString()}</td>
                  <td>${v.descuento_total.toLocaleString()}</td>
                  <td className="fw-bold text-success">
                    ${v.total_general.toLocaleString()}
                  </td>
                  <td>{v.numero_facturas}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center text-muted">
            No hay registros que coincidan con el filtro seleccionado.
          </p>
        )}
      </Card>
    </Container>
  );
}
