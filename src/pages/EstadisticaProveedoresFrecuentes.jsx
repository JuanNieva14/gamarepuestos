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

export default function ProveedoresFrecuentes() {
  const [proveedores, setProveedores] = useState([
    { nombre: "Motos del Norte S.A.S", pedidos: 25, total: 12500000 },
    { nombre: "Repuestos el Andino", pedidos: 18, total: 8800000 },
    { nombre: "Distribuidora Quibdó", pedidos: 15, total: 7200000 },
    { nombre: "Moto Parts Colombia", pedidos: 13, total: 6500000 },
    { nombre: "Motozon S.A.", pedidos: 10, total: 5700000 },
    { nombre: "Lubricantes del Pacífico", pedidos: 8, total: 4900000 },
    { nombre: "Repuestos RKJ", pedidos: 7, total: 4200000 },
  ]);

  const colores = ["#FF4C4C", "#FF9B3F", "#FFD23F", "#55C1FF", "#B95EFF", "#4EFFA1", "#FF77C5"];

  // 📊 Totales
  const totalPedidos = proveedores.reduce((acc, p) => acc + p.pedidos, 0);
  const totalCompras = proveedores.reduce((acc, p) => acc + p.total, 0);

  // 📄 Descargar PDF
  const handleDescargarPDF = () => {
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Proveedores Frecuentes</title>
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
          <h2>PROVEEDORES FRECUENTES</h2>
          <table>
            <tr><th>Proveedor</th><th>Pedidos Realizados</th><th>Total (COP)</th></tr>
            ${proveedores
              .map(
                (p) =>
                  `<tr><td>${p.nombre}</td><td>${p.pedidos}</td><td>$${p.total.toLocaleString()}</td></tr>`
              )
              .join("")}
          </table>
          <h3 style="text-align:right;margin-top:15px;">Total Comprado: $${totalCompras.toLocaleString()}</h3>
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
    const encabezado = ["Proveedor", "Pedidos Realizados", "Total (COP)"];
    const filas = proveedores.map((p) => [p.nombre, p.pedidos, p.total]);
    const contenido = [encabezado, ...filas].map((fila) => fila.join("\t")).join("\n");
    const blob = new Blob([contenido], { type: "text/tab-separated-values" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = "Proveedores_Frecuentes.xls";
    enlace.click();
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Proveedores Frecuentes</h2>

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
            <h5>Total de proveedores frecuentes:</h5>
            <h4 className="text-warning">{proveedores.length}</h4>
          </Col>
          <Col>
            <h5>Total de pedidos:</h5>
            <h4 className="text-info">{totalPedidos}</h4>
          </Col>
          <Col>
            <h5>Total comprado:</h5>
            <h4 className="text-success">$ {totalCompras.toLocaleString()}</h4>
          </Col>
        </Row>

        {/* 🔹 Gráficas dinámicas */}
        <Row className="gy-4">
          <Col md={6}>
            <h5 className="text-center text-light mb-2">Gráfica de Barras</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={proveedores}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="nombre" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Bar dataKey="pedidos" fill="#FF4C4C" name="Pedidos Realizados" />
              </BarChart>
            </ResponsiveContainer>
          </Col>

          <Col md={6}>
            <h5 className="text-center text-light mb-2">Gráfica de Pastel</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={proveedores}
                  dataKey="pedidos"
                  nameKey="nombre"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {proveedores.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>

        {/* 📈 Tendencia de Pedidos */}
        <Row className="mt-5">
          <Col>
            <h5 className="text-center text-light mb-2">Tendencia de Pedidos</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={proveedores}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="nombre" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pedidos" stroke="#FF4C4C" name="Pedidos Realizados" />
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
              <th>Proveedor</th>
              <th>Pedidos Realizados</th>
              <th>Total (COP)</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((p, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{p.nombre}</td>
                <td>{p.pedidos}</td>
                <td>$ {p.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
