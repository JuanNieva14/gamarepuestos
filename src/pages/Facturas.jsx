import React, { useState } from "react";
import { Container, Card, Table, Form, Row, Col, Button, Badge } from "react-bootstrap";

export default function Documentos() {
  const [busqueda, setBusqueda] = useState("");

  const [documentos, setDocumentos] = useState([
    { id: 1, tipo: "Factura", numero: "F001", persona: "Juan Pérez", total: 125000, fecha: "2025-01-10", estado: "Emitido" },
    { id: 2, tipo: "Cotización", numero: "C015", persona: "María Rodríguez", total: 98000, fecha: "2025-01-15", estado: "Aprobado" },
    { id: 3, tipo: "Factura", numero: "F002", persona: "Carlos Ramírez", total: 187000, fecha: "2025-01-25", estado: "Pagado" },
    { id: 4, tipo: "Comprobante", numero: "CP023", persona: "MotoZone Import", total: 455000, fecha: "2025-02-01", estado: "Procesado" },
    { id: 5, tipo: "Factura", numero: "F003", persona: "Pedro Gómez", total: 157000, fecha: "2025-02-10", estado: "Pendiente" },
    { id: 6, tipo: "Cotización", numero: "C016", persona: "Lubricantes Colombia", total: 72000, fecha: "2025-02-12", estado: "Rechazado" },
    { id: 7, tipo: "Factura", numero: "F004", persona: "Accesorios Motos S.A", total: 232000, fecha: "2025-02-18", estado: "Pagado" },
    { id: 8, tipo: "Factura", numero: "F005", persona: "MotoRepuestos Chocó", total: 300000, fecha: "2025-03-03", estado: "Emitido" },
  ]);

  // Filtrar búsqueda
  const documentosFiltrados = documentos.filter(
    (d) =>
      d.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      d.persona.toLowerCase().includes(busqueda.toLowerCase()) ||
      d.numero.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Etiquetas de estado
  const getBadge = (estado) => {
    switch (estado) {
      case "Pagado":
        return <Badge bg="success">Pagado</Badge>;
      case "Pendiente":
        return <Badge bg="warning" text="dark">Pendiente</Badge>;
      case "Aprobado":
        return <Badge bg="info" text="dark">Aprobado</Badge>;
      case "Rechazado":
        return <Badge bg="danger">Rechazado</Badge>;
      case "Emitido":
        return <Badge bg="primary">Emitido</Badge>;
      case "Procesado":
        return <Badge bg="secondary">Procesado</Badge>;
      default:
        return <Badge bg="light" text="dark">{estado}</Badge>;
    }
  };

  // 🖨️ Generar PDF simulado
  const handleDescargarPDF = (doc) => {
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>${doc.tipo} ${doc.numero}</title>
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
          <h2>${doc.tipo} ${doc.numero}</h2>
          <p><strong>Cliente/Proveedor:</strong> ${doc.persona}</p>
          <p><strong>Fecha:</strong> ${doc.fecha}</p>
          <table>
            <tr><th>Total</th><th>Estado</th></tr>
            <tr><td>$${doc.total.toLocaleString()}</td><td>${doc.estado}</td></tr>
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
        <h2 className="text-center text-danger mb-4">Facturas</h2>

        {/* 🔍 Búsqueda */}
        <Row className="mb-4">
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Buscar por número, tipo o cliente/proveedor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Col>
        </Row>

        {/* 📋 Tabla de documentos */}
        <Table striped bordered hover variant="dark" responsive className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Tipo</th>
              <th>Número</th>
              <th>Cliente/Proveedor</th>
              <th>Total (COP)</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {documentosFiltrados.length > 0 ? (
              documentosFiltrados.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.tipo}</td>
                  <td>{d.numero}</td>
                  <td>{d.persona}</td>
                  <td>${d.total.toLocaleString()}</td>
                  <td>{d.fecha}</td>
                  <td>{getBadge(d.estado)}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-light"
                      onClick={() => handleDescargarPDF(d)}
                    >
                      ⬇️ Descargar PDF
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No se encontraron documentos.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
