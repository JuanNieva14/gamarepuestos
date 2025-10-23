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

export default function ClientesDestacados() {
  const [clientes, setClientes] = useState([
    { nombre: "Juan Pérez", compras: 12, total: 3200000 },
    { nombre: "María Gómez", compras: 9, total: 2850000 },
    { nombre: "Carlos Rojas", compras: 8, total: 2100000 },
    { nombre: "Andrea López", compras: 7, total: 1950000 },
    { nombre: "Pedro Martínez", compras: 6, total: 1780000 },
    { nombre: "Laura Torres", compras: 6, total: 1550000 },
    { nombre: "Diego Sánchez", compras: 5, total: 1420000 },
  ]);

  const colores = ["#FF4C4C", "#FF9B3F", "#FFD23F", "#55C1FF", "#B95EFF", "#4EFFA1", "#FF77C5"];

  // 📊 Totales
  const totalCompras = clientes.reduce((acc, c) => acc + c.total, 0);
  const totalClientes = clientes.length;

  // 📄 Descargar PDF
  const handleDescargarPDF = () => {
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Clientes Destacados</title>
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
          <h2>CLIENTES DESTACADOS</h2>
          <table>
            <tr><th>Cliente</th><th>Compras Realizadas</th><th>Total (COP)</th></tr>
            ${clientes
              .map(
                (c) =>
                  `<tr><td>${c.nombre}</td><td>${c.compras}</td><td>$${c.total.toLocaleString()}</td></tr>`
              )
              .join("")}
          </table>
          <h3 style="text-align:right;margin-top:15px;">Total Facturado: $${totalCompras.toLocaleString()}</h3>
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
    const encabezado = ["Cliente", "Compras", "Total (COP)"];
    const filas = clientes.map((c) => [c.nombre, c.compras, c.total]);
    const contenido = [encabezado, ...filas].map((fila) => fila.join("\t")).join("\n");
    const blob = new Blob([contenido], { type: "text/tab-separated-values" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = "Clientes_Destacados.xls";
    enlace.click();
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Clientes Destacados</h2>

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
            <h5>Total de clientes destacados:</h5>
            <h4 className="text-warning">{totalClientes}</h4>
          </Col>
          <Col>
            <h5>Total facturado:</h5>
            <h4 className="text-success">$ {totalCompras.toLocaleString()}</h4>
          </Col>
        </Row>

        {/* 🔹 Gráficas dinámicas */}
        <Row className="gy-4">
          <Col md={6}>
            <h5 className="text-center text-light mb-2">Gráfica de Barras</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clientes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="nombre" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#FF4C4C" name="Total (COP)" />
              </BarChart>
            </ResponsiveContainer>
          </Col>

          <Col md={6}>
            <h5 className="text-center text-light mb-2">Gráfica de Pastel</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={clientes}
                  dataKey="total"
                  nameKey="nombre"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {clientes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>

        {/* 📈 Tendencia de Compras */}
        <Row className="mt-5">
          <Col>
            <h5 className="text-center text-light mb-2">Tendencia de Compras</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={clientes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="nombre" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="compras" stroke="#FF4C4C" name="Compras Realizadas" />
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
              <th>Cliente</th>
              <th>Compras Realizadas</th>
              <th>Total (COP)</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{c.nombre}</td>
                <td>{c.compras}</td>
                <td>$ {c.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
