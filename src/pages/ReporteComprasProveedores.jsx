import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Table,
  Form,
  Row,
  Col,
  Button,
  Badge,
  Spinner,
} from "react-bootstrap";
import { obtenerComprasProveedores } from "../services/compras_proveedores";

export default function ComprasProveedores() {
  const [comprasOriginal, setComprasOriginal] = useState([]); // todos los datos
  const [compras, setCompras] = useState([]); // filtrados
  const [busqueda, setBusqueda] = useState("");
  const [filtroMes, setFiltroMes] = useState("Todos");
  const [cargando, setCargando] = useState(true);

  // 🔠 Traducción de meses inglés → español
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

  // 🔁 Cargar datos al iniciar
  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      const res = await obtenerComprasProveedores("", "Todos");
      if (res.success) {
        // traducir meses
        const dataTraducida = res.data.map((item) => ({
          ...item,
          mes: traducirMes(item.mes),
        }));
        setComprasOriginal(dataTraducida);
        setCompras(dataTraducida);
      } else {
        setCompras([]);
      }
      setCargando(false);
    };
    cargar();
  }, []);

  // 🔍 Filtro dinámico global (sin llamar al backend)
  useEffect(() => {
    let filtrados = [...comprasOriginal];

    if (filtroMes !== "Todos") {
      filtrados = filtrados.filter(
        (c) => c.mes.toLowerCase() === filtroMes.toLowerCase()
      );
    }

    if (busqueda.trim() !== "") {
      filtrados = filtrados.filter((c) =>
        c.proveedor.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setCompras(filtrados);
  }, [busqueda, filtroMes, comprasOriginal]);

  // 🧮 Total general
  const totalGeneral = compras.reduce(
    (acc, c) => acc + (Number(c.total) || 0),
    0
  );

  // 🧾 Exportar PDF (vista imprimible)
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
          <p><strong>Periodo:</strong> ${
            filtroMes === "Todos" ? "Todos los meses" : filtroMes
          }</p>
          <table>
            <tr><th>#</th><th>Proveedor</th><th>Mes</th><th>Facturas</th><th>Total (COP)</th></tr>
            ${compras
              .map(
                (c, i) =>
                  `<tr><td>${i + 1}</td><td>${c.proveedor}</td><td>${c.mes}</td><td>${c.facturas}</td><td>$${(
                    Number(c.total) || 0
                  ).toLocaleString()}</td></tr>`
              )
              .join("")}
          </table>
          <h3 style="text-align:right;margin-top:15px;">Total general: $${totalGeneral.toLocaleString()}</h3>
          <div class="footer">
            <p>Documento generado automáticamente por el sistema</p>
            <p>Gama Repuestos Quibdó</p>
          </div>
        </body>
      </html>
    `);
    ventana.document.close();
    ventana.print();
  };

  // 🏷️ Etiquetas de estado visual
  const getBadge = (total) => {
    const valor = Number(total) || 0;
    if (valor > 1800000) return <Badge bg="success">Alta</Badge>;
    if (valor > 1000000) return <Badge bg="warning" text="dark">Media</Badge>;
    return <Badge bg="secondary">Baja</Badge>;
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Compras a Proveedores</h2>

        {/* 🔍 Filtros */}
        <Row className="mb-4 justify-content-center">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Buscar por proveedor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select
              value={filtroMes}
              onChange={(e) => setFiltroMes(e.target.value)}
            >
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
          <div className="text-center my-4">
            <Spinner animation="border" variant="light" />
            <p className="mt-2">Cargando compras...</p>
          </div>
        ) : (
          <Table
            striped
            bordered
            hover
            variant="dark"
            responsive
            className="text-center align-middle"
          >
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
              {compras.length > 0 ? (
                compras.map((c, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{c.proveedor}</td>
                    <td>{c.mes}</td>
                    <td>{c.facturas}</td>
                    <td>${(Number(c.total) || 0).toLocaleString()}</td>
                    <td>{getBadge(c.total)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No se encontraron resultados.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}

        {/* 🧮 Total general */}
        <div className="mt-4 text-end">
          <h5>
            Total general del periodo:{" "}
            <span className="text-danger">
              ${totalGeneral.toLocaleString()}
            </span>
          </h5>
        </div>
      </Card>
    </Container>
  );
}
