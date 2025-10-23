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

export default function GraficasVentas() {
  // 🔹 Datos simulados
  const [ventas, setVentas] = useState([
    { mes: "Enero", total: 4200000, productos: 320 },
    { mes: "Febrero", total: 3900000, productos: 280 },
    { mes: "Marzo", total: 5100000, productos: 350 },
    { mes: "Abril", total: 4650000, productos: 310 },
    { mes: "Mayo", total: 5300000, productos: 370 },
    { mes: "Junio", total: 4800000, productos: 330 },
  ]);

  const colores = ["#FF4C4C", "#FF9B3F", "#FFD23F", "#55C1FF", "#B95EFF", "#4EFFA1"];

  // 📊 Totales
  const totalVentas = ventas.reduce((acc, v) => acc + v.total, 0);
  const totalProductos = ventas.reduce((acc, v) => acc + v.productos, 0);

  // 📄 Descargar PDF
  const handleDescargarPDF = () => {
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Gráficas Comparativas de Ventas</title>
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
          <h2>GRÁFICAS COMPARATIVAS DE VENTAS</h2>
          <table>
            <tr><th>Mes</th><th>Total (COP)</th><th>Productos Vendidos</th></tr>
            ${ventas
              .map(
                (v) =>
                  `<tr><td>${v.mes}</td><td>$${v.total.toLocaleString()}</td><td>${v.productos}</td></tr>`
              )
              .join("")}
          </table>
          <h3 style="text-align:right;margin-top:15px;">Total Ventas: $${totalVentas.toLocaleString()}</h3>
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
    const encabezado = ["Mes", "Total (COP)", "Productos Vendidos"];
    const filas = ventas.map((v) => [v.mes, v.total, v.productos]);
    const contenido = [encabezado, ...filas].map((fila) => fila.join("\t")).join("\n");
    const blob = new Blob([contenido], { type: "text/tab-separated-values" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = "Graficas_Ventas.xls";
    enlace.click();
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Gráficas Comparativas de Ventas</h2>

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
            <h5>Total de ventas:</h5>
            <h4 className="text-success">$ {totalVentas.toLocaleString()}</h4>
          </Col>
          <Col>
            <h5>Total productos vendidos:</h5>
            <h4 className="text-warning">{totalProductos}</h4>
          </Col>
        </Row>

        {/* 🔹 Gráfica de Barras */}
        <Row className="gy-4">
          <Col md={6}>
            <h5 className="text-center text-light mb-2">Ventas Mensuales (Barras)</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ventas}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="mes" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#FF4C4C" name="Total Ventas (COP)" />
              </BarChart>
            </ResponsiveContainer>
          </Col>

          {/* 🔸 Gráfica de Pastel */}
          <Col md={6}>
            <h5 className="text-center text-light mb-2">Distribución por Mes (Pastel)</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ventas}
                  dataKey="total"
                  nameKey="mes"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {ventas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>

        {/* 🔹 Gráfica de Línea */}
        <Row className="mt-5">
          <Col>
            <h5 className="text-center text-light mb-2">Tendencia de Ventas (Línea)</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ventas}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="mes" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#FF4C4C" name="Total Ventas (COP)" />
                <Line type="monotone" dataKey="productos" stroke="#00C49F" name="Productos Vendidos" />
              </LineChart>
            </ResponsiveContainer>
          </Col>
        </Row>

        {/* 📋 Tabla de resumen */}
        <Table striped bordered hover variant="dark" responsive className="text-center mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Mes</th>
              <th>Total Ventas (COP)</th>
              <th>Productos Vendidos</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((v, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{v.mes}</td>
                <td>$ {v.total.toLocaleString()}</td>
                <td>{v.productos}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
