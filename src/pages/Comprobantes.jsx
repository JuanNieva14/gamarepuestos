import React, { useState } from "react";
import { Container, Card, Table, Form, Row, Col, Button, Badge } from "react-bootstrap";

export default function Comprobantes() {
  const [busqueda, setBusqueda] = useState("");

  const [comprobantes, setComprobantes] = useState([
    { id: 1, numero: "E001", tipo: "Entrada", proveedor: "MotoZone Import", total: 580000, fecha: "2025-01-10", estado: "Procesado" },
    { id: 2, numero: "S001", tipo: "Salida", proveedor: "Taller Los Andes", total: 210000, fecha: "2025-01-15", estado: "Procesado" },
    { id: 3, numero: "E002", tipo: "Entrada", proveedor: "Repuestos del Norte", total: 910000, fecha: "2025-01-25", estado: "Pendiente" },
    { id: 4, numero: "S002", tipo: "Salida", proveedor: "MotoRepuestos Chocó", total: 145000, fecha: "2025-02-01", estado: "Procesado" },
    { id: 5, numero: "E003", tipo: "Entrada", proveedor: "Lubricantes Colombia", total: 765000, fecha: "2025-02-10", estado: "Procesado" },
    { id: 6, numero: "S003", tipo: "Salida", proveedor: "Importadora del Pacífico", total: 178000, fecha: "2025-02-12", estado: "Pendiente" },
    { id: 7, numero: "E004", tipo: "Entrada", proveedor: "Distribuidora AKT", total: 350000, fecha: "2025-02-18", estado: "Procesado" },
    { id: 8, numero: "S004", tipo: "Salida", proveedor: "Accesorios Motos S.A", total: 270000, fecha: "2025-03-03", estado: "Procesado" },
  ]);

  // 🔍 Filtrar por número o proveedor
  const comprobantesFiltrados = comprobantes.filter(
    (c) =>
      c.proveedor.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.numero.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🟢 Etiquetas visuales de estado
  const getBadge = (estado) => {
    switch (estado) {
      case "Procesado":
        return <Badge bg="success">Procesado</Badge>;
      case "Pendiente":
        return <Badge bg="warning" text="dark">Pendiente</Badge>;
      default:
        return <Badge bg="secondary">{estado}</Badge>;
    }
  };

  // 📄 Generar PDF funcional
  const handleDescargarPDF = (comprobante) => {
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Comprobante ${comprobante.numero}</title>
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
          <h2>COMPROBANTE DE ${comprobante.tipo.toUpperCase()} ${comprobante.numero}</h2>
          <p><strong>Proveedor:</strong> ${comprobante.proveedor}</p>
          <p><strong>Fecha:</strong> ${comprobante.fecha}</p>
          <table>
            <tr><th>Tipo</th><th>Total</th><th>Estado</th></tr>
            <tr><td>${comprobante.tipo}</td><td>$${comprobante.total.toLocaleString()}</td><td>${comprobante.estado}</td></tr>
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
        <h2 className="text-center text-danger mb-4">Comprobantes de Entrada y Salida</h2>

        {/* 🔍 Búsqueda */}
        <Row className="mb-4">
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Buscar por proveedor o número de comprobante..."
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
              <th>Tipo</th>
              <th>Proveedor</th>
              <th>Total (COP)</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {comprobantesFiltrados.length > 0 ? (
              comprobantesFiltrados.map((c) => (
                <tr key={c.id}>
                  <td>{c.numero}</td>
                  <td>{c.tipo}</td>
                  <td>{c.proveedor}</td>
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
                <td colSpan="7" className="text-center text-muted">
                  No se encontraron comprobantes.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
