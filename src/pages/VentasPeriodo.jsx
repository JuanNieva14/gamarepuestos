import React, { useState } from "react";
import { Container, Card, Form, Row, Col, Table, Badge } from "react-bootstrap";

export default function VentasPeriodo() {
  const [periodo, setPeriodo] = useState("mes");

  // 🔹 Datos simulados por periodo
  const datosVentas = {
    dia: [
      { fecha: "Lunes", total: 280000, producto: "Aceite ELF" },
      { fecha: "Martes", total: 320000, producto: "Bujías NGK" },
      { fecha: "Miércoles", total: 250000, producto: "Llantas Michelin" },
      { fecha: "Jueves", total: 400000, producto: "Filtros Honda" },
      { fecha: "Viernes", total: 300000, producto: "Cascos MT" },
    ],
    semana: [
      { fecha: "Semana 1", total: 1650000, producto: "Aceite ELF" },
      { fecha: "Semana 2", total: 1420000, producto: "Bujías NGK" },
      { fecha: "Semana 3", total: 1840000, producto: "Llantas Michelin" },
      { fecha: "Semana 4", total: 2100000, producto: "Filtros Honda" },
    ],
    mes: [
      { fecha: "Enero", total: 5200000, producto: "Aceite ELF" },
      { fecha: "Febrero", total: 4500000, producto: "Bujías NGK" },
      { fecha: "Marzo", total: 6100000, producto: "Llantas Michelin" },
      { fecha: "Abril", total: 5750000, producto: "Filtros Honda" },
      { fecha: "Mayo", total: 6300000, producto: "Pastillas Freno" },
    ],
  };

  const handlePeriodoChange = (e) => setPeriodo(e.target.value);

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">
          Ventas por {periodo === "dia" ? "Día" : periodo === "semana" ? "Semana" : "Mes"}
        </h2>

        {/* 🔹 Selector de periodo */}
        <Row className="mb-4">
          <Col md={4}>
            <Form.Select value={periodo} onChange={handlePeriodoChange}>
              <option value="dia">Día</option>
              <option value="semana">Semana</option>
              <option value="mes">Mes</option>
            </Form.Select>
          </Col>
        </Row>

        {/* 📋 Tabla comparativa */}
        <Table striped bordered hover variant="dark" responsive className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>{periodo === "mes" ? "Mes" : periodo === "semana" ? "Semana" : "Día"}</th>
              <th>Producto más vendido</th>
              <th>Total (COP)</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {datosVentas[periodo].map((venta, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{venta.fecha}</td>
                <td>{venta.producto}</td>
                <td>${venta.total.toLocaleString()}</td>
                <td>
                  {venta.total > 5000000 ? (
                    <Badge bg="success">Alta</Badge>
                  ) : venta.total > 2000000 ? (
                    <Badge bg="warning" text="dark">Media</Badge>
                  ) : (
                    <Badge bg="secondary">Baja</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* 🔸 Resumen general */}
        <div className="mt-4 text-end">
          <h5>
            Total General:{" "}
            <span className="text-danger">
              ${datosVentas[periodo].reduce((acc, item) => acc + item.total, 0).toLocaleString()}
            </span>
          </h5>
        </div>
      </Card>
    </Container>
  );
}
