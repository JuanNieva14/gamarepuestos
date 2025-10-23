import React, { useState } from "react";
import { Container, Card, Table, Form, Row, Col, Button, Badge } from "react-bootstrap";

export default function ComprasProveedores() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroMes, setFiltroMes] = useState("Todos");

  const [compras, setCompras] = useState([
    { id: 1, proveedor: "MotoZone Import", mes: "Enero", total: 1250000, facturas: 3 },
    { id: 2, proveedor: "Lubricantes Colombia", mes: "Enero", total: 980000, facturas: 2 },
    { id: 3, proveedor: "Repuestos del Norte", mes: "Febrero", total: 1870000, facturas: 4 },
    { id: 4, proveedor: "Accesorios Motos S.A", mes: "Febrero", total: 750000, facturas: 1 },
    { id: 5, proveedor: "Importadora La Rueda", mes: "Marzo", total: 2150000, facturas: 5 },
    { id: 6, proveedor: "MotoExpress Pro", mes: "Marzo", total: 1540000, facturas: 3 },
    { id: 7, proveedor: "Distribuidora AKT", mes: "Abril", total: 1920000, facturas: 4 },
    { id: 8, proveedor: "Suministros del Pacífico", mes: "Abril", total: 1280000, facturas: 2 },
  ]);

  // 🔍 Filtrar por proveedor y mes
  const comprasFiltradas = compras.filter(
    (c) =>
      (filtroMes === "Todos" || c.mes === filtroMes) &&
      c.proveedor.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🧮 Total general
  const totalGeneral = comprasFiltradas.reduce((acc, c) => acc + c.total, 0);

  // 🧾 Generar PDF funcional
  const handleDescargarPDF = () => {
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Compras a Proveedores</title>
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
          <h2>HISTÓRICO DE COMPRAS A PROVEEDORES</h2>
          <p><strong>Periodo:</strong> ${filtroMes === "Todos" ? "Todos los meses" : filtroMes}</p>
          <table>
            <tr><th>#</th><th>Proveedor</th><th>Mes</th><th>Facturas</th><th>Total (COP)</th></tr>
            ${comprasFiltradas.map(
              (c) =>
                `<tr><td>${c.id}</td><td>${c.proveedor}</td><td>${c.mes}</td><td>${c.facturas}</td><td>$${c.total.toLocaleString()}</td></tr>`
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
        <h2 className="text-center text-danger mb-4">Compras a Proveedores</h2>

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
            {comprasFiltradas.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.proveedor}</td>
                <td>{c.mes}</td>
                <td>{c.facturas}</td>
                <td>${c.total.toLocaleString()}</td>
                <td>
                  {c.total > 1800000 ? (
                    <Badge bg="success">Alta</Badge>
                  ) : c.total > 1000000 ? (
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
