import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Table,
} from "react-bootstrap";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function ProductosMasVendidos() {
  const [productos, setProductos] = useState([
    { nombre: "Aceite ELF 20W50", cantidad: 250, total: 1750000 },
    { nombre: "Bujías NGK", cantidad: 230, total: 1150000 },
    { nombre: "Pastillas de Freno", cantidad: 190, total: 1420000 },
    { nombre: "Llantas Michelin", cantidad: 175, total: 2560000 },
    { nombre: "Cascos MT Helmets", cantidad: 160, total: 2200000 },
    { nombre: "Lubricante Motul", cantidad: 150, total: 960000 },
    { nombre: "Cadenas DID", cantidad: 120, total: 870000 },
  ]);

  const colores = ["#FF4C4C", "#FF9B3F", "#FFD23F", "#55C1FF", "#B95EFF", "#4EFFA1", "#FF77C5"];

  // 📊 Totales
  const totalVentas = productos.reduce((acc, p) => acc + p.total, 0);
  const totalUnidades = productos.reduce((acc, p) => acc + p.cantidad, 0);

  // 📄 Descargar PDF
  const handleDescargarPDF = () => {
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Productos Más Vendidos</title>
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
          <h2>REPORTE DE PRODUCTOS MÁS VENDIDOS</h2>
          <table>
            <tr><th>Producto</th><th>Unidades Vendidas</th><th>Total (COP)</th></tr>
            ${productos
              .map(
                (p) =>
                  `<tr><td>${p.nombre}</td><td>${p.cantidad}</td><td>$${p.total.toLocaleString()}</td></tr>`
              )
              .join("")}
          </table>
          <h3 style="text-align:right;margin-top:15px;">Total de Ventas: $${totalVentas.toLocaleString()}</h3>
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

  // 📊 Descargar Excel
  const handleDescargarExcel = () => {
    const encabezado = ["Producto", "Unidades Vendidas", "Total (COP)"];
    const filas = productos.map((p) => [p.nombre, p.cantidad, p.total]);
    const contenido = [encabezado, ...filas].map((fila) => fila.join("\t")).join("\n");
    const blob = new Blob([contenido], { type: "text/tab-separated-values" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = "Productos_Mas_Vendidos.xls";
    enlace.click();
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Productos Más Vendidos</h2>

        {/* Botones de exportación */}
        <Row className="mb-4 justify-content-end">
          <Col md="auto">
            <Button variant="outline-light" onClick={handleDescargarPDF} className="me-2">
              📄 Exportar PDF
            </Button>
            <Button variant="outline-success" onClick={handleDescargarExcel}>
              📊 Exportar Excel
            </Button>
          </Col>
        </Row>

        {/* 📈 Estadísticas rápidas */}
        <Row className="text-center mb-4">
          <Col>
            <h5>Total de productos vendidos:</h5>
            <h4 className="text-warning">{totalUnidades.toLocaleString()} unidades</h4>
          </Col>
          <Col>
            <h5>Total facturado:</h5>
            <h4 className="text-success">$ {totalVentas.toLocaleString()}</h4>
          </Col>
        </Row>

        {/* 🔹 Gráficas dinámicas */}
        <Row className="gy-4">
          <Col md={6}>
            <h5 className="text-center text-light mb-2">Gráfica de Barras</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productos}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="nombre" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#FF4C4C" name="Unidades Vendidas" />
              </BarChart>
            </ResponsiveContainer>
          </Col>

          <Col md={6}>
            <h5 className="text-center text-light mb-2">Gráfica de Pastel</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productos}
                  dataKey="cantidad"
                  nameKey="nombre"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {productos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h5 className="text-center text-light mb-2">Tendencia de Ventas</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productos}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="nombre" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cantidad" stroke="#FF4C4C" name="Unidades Vendidas" />
                <Line type="monotone" dataKey="total" stroke="#00C49F" name="Total (COP)" />
              </LineChart>
            </ResponsiveContainer>
          </Col>
        </Row>

        {/* 📋 Tabla final */}
        <Table striped bordered hover variant="dark" responsive className="text-center mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Unidades Vendidas</th>
              <th>Total (COP)</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{p.nombre}</td>
                <td>{p.cantidad}</td>
                <td>$ {p.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
