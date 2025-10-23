import React, { useState } from "react";
import { Container, Card, Table, Form, Row, Col, Button, Badge } from "react-bootstrap";

export default function PedidosProveedores() {
  const [busqueda, setBusqueda] = useState("");

  const [pedidos, setPedidos] = useState([
    { id: 1, numero: "P001", proveedor: "MotoZone Import", productos: 5, total: 580000, fecha: "2025-01-10", estado: "En pedido" },
    { id: 2, numero: "P002", proveedor: "Lubricantes Colombia", productos: 3, total: 320000, fecha: "2025-01-15", estado: "Recibido" },
    { id: 3, numero: "P003", proveedor: "Repuestos del Norte", productos: 8, total: 910000, fecha: "2025-01-25", estado: "Cancelado" },
    { id: 4, numero: "P004", proveedor: "Accesorios Motos S.A", productos: 4, total: 420000, fecha: "2025-02-01", estado: "En pedido" },
    { id: 5, numero: "P005", proveedor: "MotoRepuestos Chocó", productos: 6, total: 765000, fecha: "2025-02-10", estado: "Recibido" },
    { id: 6, numero: "P006", proveedor: "Importadora La Rueda", productos: 9, total: 1150000, fecha: "2025-02-12", estado: "En pedido" },
    { id: 7, numero: "P007", proveedor: "Suministros del Pacífico", productos: 2, total: 180000, fecha: "2025-02-18", estado: "Cancelado" },
    { id: 8, numero: "P008", proveedor: "MotoExpress Pro", productos: 7, total: 890000, fecha: "2025-03-03", estado: "Recibido" },
  ]);

  // 🔍 Filtrar por proveedor o número
  const pedidosFiltrados = pedidos.filter(
    (p) =>
      p.proveedor.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.numero.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🟢 Etiquetas visuales de estado
  const getBadge = (estado) => {
    switch (estado) {
      case "Recibido":
        return <Badge bg="success">Recibido</Badge>;
      case "En pedido":
        return <Badge bg="warning" text="dark">En pedido</Badge>;
      case "Cancelado":
        return <Badge bg="danger">Cancelado</Badge>;
      default:
        return <Badge bg="secondary">{estado}</Badge>;
    }
  };

  // 📄 Generar PDF funcional
  const handleDescargarPDF = (pedido) => {
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Pedido ${pedido.numero}</title>
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
          <h2>PEDIDO A PROVEEDOR ${pedido.numero}</h2>
          <p><strong>Proveedor:</strong> ${pedido.proveedor}</p>
          <p><strong>Fecha:</strong> ${pedido.fecha}</p>
          <table>
            <tr><th>Productos</th><th>Total</th><th>Estado</th></tr>
            <tr><td>${pedido.productos}</td><td>$${pedido.total.toLocaleString()}</td><td>${pedido.estado}</td></tr>
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
        <h2 className="text-center text-danger mb-4">Pedidos a Proveedores</h2>

        {/* 🔍 Búsqueda */}
        <Row className="mb-4">
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Buscar por proveedor o número de pedido..."
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
              <th>Proveedor</th>
              <th>Productos</th>
              <th>Total (COP)</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.length > 0 ? (
              pedidosFiltrados.map((p) => (
                <tr key={p.id}>
                  <td>{p.numero}</td>
                  <td>{p.proveedor}</td>
                  <td>{p.productos}</td>
                  <td>${p.total.toLocaleString()}</td>
                  <td>{p.fecha}</td>
                  <td>{getBadge(p.estado)}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-light"
                      onClick={() => handleDescargarPDF(p)}
                    >
                      ⬇️ Descargar PDF
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No se encontraron pedidos.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
