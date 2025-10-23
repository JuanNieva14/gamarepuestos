import React, { useState } from "react";
import { Container, Card, Table, Form, Row, Col, Button, Badge } from "react-bootstrap";

export default function Cotizaciones() {
  const [busqueda, setBusqueda] = useState("");

  const [cotizaciones, setCotizaciones] = useState([
    { id: 1, numero: "C001", cliente: "Juan Pérez", total: 125000, fecha: "2025-01-10", estado: "Emitida" },
    { id: 2, numero: "C002", cliente: "María Rodríguez", total: 98000, fecha: "2025-01-15", estado: "Aprobada" },
    { id: 3, numero: "C003", cliente: "Carlos Ramírez", total: 187000, fecha: "2025-01-25", estado: "Rechazada" },
    { id: 4, numero: "C004", cliente: "Ana Torres", total: 455000, fecha: "2025-02-01", estado: "Pendiente" },
    { id: 5, numero: "C005", cliente: "Pedro Gómez", total: 157000, fecha: "2025-02-10", estado: "Aprobada" },
    { id: 6, numero: "C006", cliente: "MotoZone Import", total: 72000, fecha: "2025-02-12", estado: "Emitida" },
    { id: 7, numero: "C007", cliente: "Lubricantes Colombia", total: 232000, fecha: "2025-02-18", estado: "Rechazada" },
    { id: 8, numero: "C008", cliente: "Accesorios Motos S.A", total: 300000, fecha: "2025-03-03", estado: "Aprobada" },
  ]);

  // 🔍 Filtrar por cliente o número
  const cotizacionesFiltradas = cotizaciones.filter(
    (c) =>
      c.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.numero.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🟢 Etiquetas visuales de estado
  const getBadge = (estado) => {
    switch (estado) {
      case "Aprobada":
        return <Badge bg="success">Aprobada</Badge>;
      case "Pendiente":
        return <Badge bg="warning" text="dark">Pendiente</Badge>;
      case "Rechazada":
        return <Badge bg="danger">Rechazada</Badge>;
      case "Emitida":
        return <Badge bg="primary">Emitida</Badge>;
      default:
        return <Badge bg="secondary">{estado}</Badge>;
    }
  };

  // 🧾 Generar y descargar PDF
  const handleDescargarPDF = (cotizacion) => {
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Cotización ${cotizacion.numero}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; color: #222; }
            h1, h2 { color: #c00; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #999; padding: 8px; text-align: center; }
            th { background-color: #f0f0f0; }
            .footer { text-align: center; margin-top: 30px; font-size: 13px; color: #555; }
            img { display: block; margin: 0 auto 10px; width: 80px; }
          </style>
        </head>
        <body>
          <img src="/imagenes/android-chrome-192x192.png" alt="Logo Gama Repuestos">
          <h1>GAMA REPUESTOS QUIBDÓ</h1>
          <h2>COTIZACIÓN ${cotizacion.numero}</h2>
          <p><strong>Cliente:</strong> ${cotizacion.cliente}</p>
          <p><strong>Fecha:</strong> ${cotizacion.fecha}</p>
          <table>
            <tr><th>Total</th><th>Estado</th></tr>
            <tr><td>$${cotizacion.total.toLocaleString()}</td><td>${cotizacion.estado}</td></tr>
          </table>
          <div class="footer">
            <p>Documento generado automáticamente por el sistema</p>
            <p>Gama Repuestos Quibdó | contacto@gamarepuestos.com</p>
          </div>
        </body>
      </html>
    `);
    ventana.document.close();
    ventana.print();
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Listado de Cotizaciones Emitidas</h2>

        {/* 🔍 Búsqueda */}
        <Row className="mb-4">
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Buscar por cliente o número de cotización..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Col>
        </Row>

        {/* 📋 Tabla */}
        <Table striped bordered hover variant="dark" responsive className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Total (COP)</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {cotizacionesFiltradas.length > 0 ? (
              cotizacionesFiltradas.map((c) => (
                <tr key={c.id}>
                  <td>{c.numero}</td>
                  <td>{c.cliente}</td>
                  <td>${c.total.toLocaleString()}</td>
                  <td>{c.fecha}</td>
                  <td>{getBadge(c.estado)}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-light"
                      onClick={() => handleDescargarPDF(c)}
                    >
                      ⬇️ Descargar PDF
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No se encontraron cotizaciones.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
