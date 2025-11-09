import React, { useState, useEffect } from "react";
import { Container, Card, Table, Form, Row, Col, Button, Badge, Spinner } from "react-bootstrap";
import axios from "axios";

export default function FacturacionPeriodo() {
  const [facturacion, setFacturacion] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroMes, setFiltroMes] = useState("Todos");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // 🗓️ Diccionario de traducción de meses
  const traducirMes = (mesIngles) => {
    const meses = {
      January: "Enero",
      February: "Febrero",
      March: "Marzo",
      April: "Abril",
      May: "Mayo",
      June: "Junio",
      July: "Julio",
      August: "Agosto",
      September: "Septiembre",
      October: "Octubre",
      November: "Noviembre",
      December: "Diciembre",
    };
    return meses[mesIngles] || mesIngles;
  };

  // 📡 Obtener datos del backend
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const res = await axios.get("http://localhost:8001/facturacion_periodo", {
          params: { busqueda, mes: filtroMes },
        });

        // 🗓️ Traducir meses antes de mostrarlos
        const datosTraducidos = (res.data.data || []).map((f) => ({
          ...f,
          mes: traducirMes(f.mes),
        }));

        setFacturacion(datosTraducidos);
      } catch (err) {
        console.error(err);
        setError("❌ Error al obtener facturación.");
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [busqueda, filtroMes]);

  // 🧮 Total general
  const totalGeneral = facturacion.reduce((acc, f) => acc + f.total, 0);

  // 🧾 Descargar PDF
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
            <tr><th>#</th><th>Cliente</th><th>Mes</th><th>Facturas</th><th>Total (COP)</th></tr>
            ${facturacion
              .map(
                (f, i) =>
                  `<tr><td>${i + 1}</td><td>${f.cliente}</td><td>${f.mes}</td><td>${f.facturas}</td><td>$${f.total.toLocaleString()}</td></tr>`
              )
              .join("")}
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
              placeholder="Buscar cliente por nombre o apellido..."
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
              <option value="Mayo">Mayo</option>
              <option value="Junio">Junio</option>
              <option value="Julio">Julio</option>
              <option value="Agosto">Agosto</option>
              <option value="Septiembre">Septiembre</option>
              <option value="Octubre">Octubre</option>
              <option value="Noviembre">Noviembre</option>
              <option value="Diciembre">Diciembre</option>
            </Form.Select>
          </Col>
          <Col md="auto">
            <Button variant="outline-light" onClick={handleDescargarPDF}>
              📄 Descargar PDF
            </Button>
          </Col>
        </Row>

        {/* 📋 Tabla */}
        {cargando ? (
          <div className="text-center">
            <Spinner animation="border" variant="light" />
            <p className="mt-2">Cargando datos...</p>
          </div>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : (
          <Table striped bordered hover variant="dark" responsive className="text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Mes</th>
                <th>Facturas</th>
                <th>Total (COP)</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {facturacion.length > 0 ? (
                facturacion.map((f, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{f.cliente}</td>
                    <td>{f.mes}</td>
                    <td>{f.facturas}</td>
                    <td>${f.total.toLocaleString()}</td>
                    <td>
                      {f.total > 1800000 ? (
                        <Badge bg="success">Alta</Badge>
                      ) : f.total > 1000000 ? (
                        <Badge bg="warning" text="dark">
                          Media
                        </Badge>
                      ) : (
                        <Badge bg="secondary">Baja</Badge>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-muted">
                    No hay resultados para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}

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
