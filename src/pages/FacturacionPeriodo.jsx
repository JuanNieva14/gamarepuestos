import React, { useState } from "react";
import { Container, Card, Table, Form, Row, Col, Button, Badge } from "react-bootstrap";

export default function FacturacionPeriodo() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroMes, setFiltroMes] = useState("Todos");

  const [facturacion, setFacturacion] = useState([
    { id: 1, proveedor: "MotoZone Import", mes: "Enero", total: 1850000, facturas: 4 },
    { id: 2, proveedor: "Lubricantes Colombia", mes: "Enero", total: 920000, facturas: 2 },
    { id: 3, proveedor: "Repuestos del Norte", mes: "Febrero", total: 1470000, facturas: 3 },
    { id: 4, proveedor: "Accesorios Motos S.A", mes: "Febrero", total: 790000, facturas: 2 },
    { id: 5, proveedor: "Importadora La Rueda", mes: "Marzo", total: 2140000, facturas: 5 },
    { id: 6, proveedor: "MotoExpress Pro", mes: "Marzo", total: 1670000, facturas: 4 },
    { id: 7, proveedor: "Distribuidora AKT", mes: "Abril", total: 1890000, facturas: 3 },
    { id: 8, proveedor: "Suministros del Pacífico", mes: "Abril", total: 970000, facturas: 2 },
  ]);

  // 🔍 Filtrar por proveedor y mes
  const facturacionFiltrada = facturacion.filter(
    (f) =>
      (filtroMes === "Todos" || f.mes === filtroMes) &&
      f.proveedor.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🧮 Total general
  const totalGeneral = facturacionFiltrada.reduce((acc, f) => acc + f.total, 0);

  // 🧾 Descargar PDF funcional
  const handleDescargarPDF = () => {
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Facturación por Periodo</title>
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
          <h2>FACTURACIÓN POR PERIODO</h2>
          <p><strong>Periodo:</strong> ${filtroMes === "Todos" ? "Todos los meses" : filtroMes}</p>
          <table>
            <tr><th>#</th><th>Proveedor</th><th>Mes</th><th>Facturas</th><th>Total (COP)</th></tr>
            ${facturacionFiltrada.map(
              (f) =>
                `<tr><td>${f.id}</td><td>${f.proveedor}</td><td>${f.mes}</td><td>${f.facturas}</td><td>$${f.total.toLocaleString()}</td></tr>`
            ).join("")}
          </table>
          <h3 style="text-align:right;margin-top:15px;">Total general: $${totalGeneral.toLocaleString()}</h3>
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
        <h2 className="text-center text-danger mb-4">Facturación por Periodo</h2>

        {/* 🔍 Filtros */}
        <Row className="mb-4">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Buscar por proveedor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select value={filtroMes} onChange={(e) => setFiltroMes(e.target.value)}>
              <option value="Todos">Todos los meses</option>
              <option value="Enero">Enero</option>
              <option value="Febrero">Febrero</option>
              <option value="Marzo">Marzo</option>
              <option value="Abril">Abril</option>
            </Form.Select>
          </Col>
          <Col md="auto">
            <Button variant="outline-light" onClick={handleDescargarPDF}>
              📄 Descargar PDF
            </Button>
          </Col>
        </Row>

        {/* 📋 Tabla */}
        <Table striped bordered hover variant="dark" responsive className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Proveedor</th>
              <th>Mes</th>
              <th>Facturas</th>
              <th>Total (COP)</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {facturacionFiltrada.map((f) => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.proveedor}</td>
                <td>{f.mes}</td>
                <td>{f.facturas}</td>
                <td>${f.total.toLocaleString()}</td>
                <td>
                  {f.total > 1800000 ? (
                    <Badge bg="success">Alta</Badge>
                  ) : f.total > 1000000 ? (
                    <Badge bg="warning" text="dark">Media</Badge>
                  ) : (
                    <Badge bg="secondary">Baja</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* 🧮 Resumen total */}
        <div className="mt-4 text-end">
          <h5>
            Total general del periodo:{" "}
            <span className="text-danger">${totalGeneral.toLocaleString()}</span>
          </h5>
        </div>
      </Card>
    </Container>
  );
}
