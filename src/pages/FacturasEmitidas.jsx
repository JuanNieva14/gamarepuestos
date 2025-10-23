import React, { useState } from "react";
import { Container, Card, Table, Form, Row, Col, Button, Badge } from "react-bootstrap";

export default function Facturas() {
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [busquedaFecha, setBusquedaFecha] = useState("");

  const [facturas, setFacturas] = useState([
    { id: 1, numero: "F001", cliente: "Juan Pérez", total: 120000, fecha: "2025-01-10", estado: "Pagada" },
    { id: 2, numero: "F002", cliente: "María Rodríguez", total: 80000, fecha: "2025-01-15", estado: "Pendiente" },
    { id: 3, numero: "F003", cliente: "Carlos Ramírez", total: 150000, fecha: "2025-02-01", estado: "Pagada" },
    { id: 4, numero: "F004", cliente: "Ana Torres", total: 95000, fecha: "2025-02-12", estado: "Cancelada" },
    { id: 5, numero: "F005", cliente: "Pedro Gómez", total: 110000, fecha: "2025-03-05", estado: "Pagada" },
  ]);

  // Filtrado por cliente o fecha
  const facturasFiltradas = facturas.filter((f) => {
    const coincideCliente = f.cliente.toLowerCase().includes(busquedaCliente.toLowerCase());
    const coincideFecha = busquedaFecha ? f.fecha === busquedaFecha : true;
    return coincideCliente && coincideFecha;
  });

  const getBadge = (estado) => {
    switch (estado) {
      case "Pagada":
        return <Badge bg="success">Pagada</Badge>;
      case "Pendiente":
        return <Badge bg="warning" text="dark">Pendiente</Badge>;
      case "Cancelada":
        return <Badge bg="danger">Cancelada</Badge>;
      default:
        return <Badge bg="secondary">{estado}</Badge>;
    }
  };

  // 🖨️ Reimprimir factura
  const handleReimprimir = (factura) => {
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Factura ${factura.numero}</title>
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
          <h2>Factura ${factura.numero}</h2>
          <p><strong>Cliente:</strong> ${factura.cliente}</p>
          <p><strong>Fecha:</strong> ${factura.fecha}</p>
          <table>
            <tr><th>Total</th><th>Estado</th></tr>
            <tr><td>$${factura.total.toLocaleString()}</td><td>${factura.estado}</td></tr>
          </table>
          <div class="footer">
            <p>Gracias por su compra 💪</p>
            <p>Calle 5 #12-34, Quibdó, Chocó | contacto@gamarepuestos.com</p>
          </div>
        </body>
      </html>
    `);
    ventana.document.close();
    ventana.print();
  };

  // 📋 Duplicar factura
  const handleDuplicar = (factura) => {
    const nuevaFactura = {
      ...factura,
      id: facturas.length + 1,
      numero: `F00${facturas.length + 1}`,
      fecha: new Date().toISOString().split("T")[0],
      estado: "Pendiente",
    };
    setFacturas([...facturas, nuevaFactura]);
    alert(`✅ Factura ${factura.numero} duplicada como ${nuevaFactura.numero}`);
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Gestión de Facturas</h2>

        {/* 🔍 Filtros */}
        <Form className="mb-4">
          <Row className="g-3">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Buscar por cliente..."
                value={busquedaCliente}
                onChange={(e) => setBusquedaCliente(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="date"
                value={busquedaFecha}
                onChange={(e) => setBusquedaFecha(e.target.value)}
              />
            </Col>
          </Row>
        </Form>

        {/* 📋 Tabla de facturas */}
        <Table striped bordered hover variant="dark" responsive className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Total (COP)</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturasFiltradas.length > 0 ? (
              facturasFiltradas.map((f) => (
                <tr key={f.id}>
                  <td>{f.numero}</td>
                  <td>{f.cliente}</td>
                  <td>${f.total.toLocaleString()}</td>
                  <td>{f.fecha}</td>
                  <td>{getBadge(f.estado)}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-light"
                      className="me-2"
                      onClick={() => handleReimprimir(f)}
                    >
                      🖨️ Reimprimir
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDuplicar(f)}
                    >
                      📄 Duplicar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No se encontraron facturas.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
