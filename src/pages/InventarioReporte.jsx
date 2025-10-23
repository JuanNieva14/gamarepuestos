import React, { useState } from "react";
import { Container, Card, Table, Button, Row, Col, Badge } from "react-bootstrap";

export default function Inventario() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Aceite ELF 20W50", stock: 25, entradas: 50, salidas: 25, estado: "Disponible" },
    { id: 2, nombre: "Bujías NGK", stock: 0, entradas: 40, salidas: 40, estado: "Agotado" },
    { id: 3, nombre: "Filtro de Aire Honda", stock: 12, entradas: 30, salidas: 18, estado: "Disponible" },
    { id: 4, nombre: "Llantas Michelin 120/70", stock: 3, entradas: 20, salidas: 17, estado: "Bajo stock" },
    { id: 5, nombre: "Pastillas de Freno", stock: 15, entradas: 35, salidas: 20, estado: "Disponible" },
    { id: 6, nombre: "Cascos MT Helmets", stock: 0, entradas: 25, salidas: 25, estado: "Agotado" },
    { id: 7, nombre: "Cadenas DID", stock: 10, entradas: 20, salidas: 10, estado: "Disponible" },
    { id: 8, nombre: "Lubricante Motul", stock: 2, entradas: 15, salidas: 13, estado: "Bajo stock" },
    { id: 9, nombre: "Manubrios Racing", stock: 5, entradas: 12, salidas: 7, estado: "Disponible" },
    { id: 10, nombre: "Espejos Retrovisores", stock: 0, entradas: 10, salidas: 10, estado: "Agotado" },
  ]);

  // 🧾 Descargar reporte PDF
  const handleDescargarPDF = () => {
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Reporte de Inventario</title>
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
          <h2>REPORTE DE INVENTARIO</h2>
          <table>
            <tr><th>ID</th><th>Producto</th><th>Stock</th><th>Entradas</th><th>Salidas</th><th>Estado</th></tr>
            ${productos.map(p => `
              <tr>
                <td>${p.id}</td>
                <td>${p.nombre}</td>
                <td>${p.stock}</td>
                <td>${p.entradas}</td>
                <td>${p.salidas}</td>
                <td>${p.estado}</td>
              </tr>
            `).join("")}
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

  // 🧾 Descargar Excel
  const handleDescargarExcel = () => {
    const encabezado = ["ID", "Producto", "Stock", "Entradas", "Salidas", "Estado"];
    const filas = productos.map(p => [p.id, p.nombre, p.stock, p.entradas, p.salidas, p.estado]);
    const contenido = [encabezado, ...filas].map(e => e.join("\t")).join("\n");
    const blob = new Blob([contenido], { type: "text/tab-separated-values" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = "Reporte_Inventario.xls";
    enlace.click();
  };

  const getBadge = (estado) => {
    switch (estado) {
      case "Disponible":
        return <Badge bg="success">Disponible</Badge>;
      case "Agotado":
        return <Badge bg="danger">Agotado</Badge>;
      case "Bajo stock":
        return <Badge bg="warning" text="dark">Bajo stock</Badge>;
      default:
        return <Badge bg="secondary">{estado}</Badge>;
    }
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Inventario General</h2>

        {/* Botones de descarga */}
        <Row className="mb-4 justify-content-end">
          <Col md="auto">
            <Button variant="outline-light" onClick={handleDescargarPDF} className="me-2">
              📄 Descargar PDF
            </Button>
            <Button variant="outline-success" onClick={handleDescargarExcel}>
              📊 Descargar Excel
            </Button>
          </Col>
        </Row>

        {/* Tabla de inventario */}
        <Table striped bordered hover variant="dark" responsive className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Stock</th>
              <th>Entradas</th>
              <th>Salidas</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.stock}</td>
                <td>{p.entradas}</td>
                <td>{p.salidas}</td>
                <td>{getBadge(p.estado)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
