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

export default function ProyeccionDemanda() {
  const [productos, setProductos] = useState([
    { nombre: "Aceite ELF 20W50", ventas: 150, proyeccion: 180 },
    { nombre: "Bujía NGK CR8E", ventas: 90, proyeccion: 110 },
    { nombre: "Filtro de aire Honda", ventas: 70, proyeccion: 95 },
    { nombre: "Llantas Michelin 90/90", ventas: 120, proyeccion: 140 },
    { nombre: "Pastillas de freno RKJ", ventas: 80, proyeccion: 100 },
    { nombre: "Cadena Xcelink 428H", ventas: 60, proyeccion: 85 },
    { nombre: "Lubricante Motul", ventas: 50, proyeccion: 70 },
  ]);

  const colores = ["#FF4C4C", "#FFD23F", "#55C1FF", "#B95EFF", "#4EFFA1", "#FF77C5", "#FF9B3F"];

  const totalActual = productos.reduce((acc, p) => acc + p.ventas, 0);
  const totalProyectado = productos.reduce((acc, p) => acc + p.proyeccion, 0);
  const diferencia = totalProyectado - totalActual;

  // 📄 Exportar a PDF
  const handleDescargarPDF = () => {
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Proyección de Demanda</title>
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
          <h2>PROYECCIÓN DE DEMANDA</h2>
          <table>
            <tr><th>Producto</th><th>Ventas Actuales</th><th>Proyección</th></tr>
            ${productos
              .map(
                (p) =>
                  `<tr><td>${p.nombre}</td><td>${p.ventas}</td><td>${p.proyeccion}</td></tr>`
              )
              .join("")}
          </table>
          <h3 style="text-align:right;margin-top:15px;">Crecimiento estimado: ${diferencia} unidades</h3>
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

  // 📊 Exportar Excel
  const handleDescargarExcel = () => {
    const encabezado = ["Producto", "Ventas Actuales", "Proyección"];
    const filas = productos.map((p) => [p.nombre, p.ventas, p.proyeccion]);
    const contenido = [encabezado, ...filas].map((fila) => fila.join("\t")).join("\n");
    const blob = new Blob([contenido], { type: "text/tab-separated-values" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = "Proyeccion_Demanda.xls";
    enlace.click();
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Proyección de Demanda</h2>

        {/* Botones exportar */}
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

        {/* Estadísticas rápidas */}
        <Row className="text-center mb-4">
          <Col>
            <h5>Total actual vendido:</h5>
            <h4 className="text-info">{totalActual} unidades</h4>
          </Col>
          <Col>
            <h5>Proyección de demanda:</h5>
            <h4 className="text-success">{totalProyectado} unidades</h4>
          </Col>
          <Col>
            <h5>Crecimiento estimado:</h5>
            <h4 className={diferencia >= 0 ? "text-warning" : "text-danger"}>
              {diferencia >= 0 ? "+" : ""}
              {diferencia} unidades
            </h4>
          </Col>
        </Row>

        {/* 📊 Gráfica de Barras */}
        <Row className="gy-4">
          <Col md={6}>
            <h5 className="text-center mb-2">Comparativo de Ventas y Proyección</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productos}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="nombre" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Bar dataKey="ventas" fill="#FF4C4C" name="Ventas Actuales" />
                <Bar dataKey="proyeccion" fill="#4EFFA1" name="Proyección" />
              </BarChart>
            </ResponsiveContainer>
          </Col>

          {/* 📈 Gráfica de Pastel */}
          <Col md={6}>
            <h5 className="text-center mb-2">Distribución de la Demanda</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productos}
                  dataKey="proyeccion"
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

        {/* 📈 Gráfica de Línea */}
        <Row className="mt-5">
          <Col>
            <h5 className="text-center mb-2">Tendencia de Proyección</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productos}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="nombre" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ventas" stroke="#FF4C4C" name="Ventas Actuales" />
                <Line type="monotone" dataKey="proyeccion" stroke="#00C49F" name="Proyección" />
              </LineChart>
            </ResponsiveContainer>
          </Col>
        </Row>

        {/* 📋 Tabla de resumen */}
        <Table striped bordered hover variant="dark" responsive className="text-center mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Ventas Actuales</th>
              <th>Proyección</th>
              <th>Diferencia</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{p.nombre}</td>
                <td>{p.ventas}</td>
                <td>{p.proyeccion}</td>
                <td
                  className={p.proyeccion - p.ventas >= 0 ? "text-success" : "text-danger"}
                >
                  {p.proyeccion - p.ventas >= 0 ? "+" : ""}
                  {p.proyeccion - p.ventas}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
