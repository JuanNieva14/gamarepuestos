import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, ProgressBar } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FileEarmarkTextFill,
  BarChartFill,
  GraphUpArrow,
  GearFill,
  PersonCircle,
  CartFill,
  BoxSeam,
  CurrencyDollar,
  AwardFill,
} from "react-bootstrap-icons";

export default function AdminInicio() {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);
  const [visitadas, setVisitadas] = useState(new Set());
  const [progreso, setProgreso] = useState(0);

  // 🔹 Cargar usuario desde localStorage
  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) setUsuario(JSON.parse(userData));
  }, []);

  // 🔹 Rutas dentro del panel admin
  const subpaginasAdmin = [
    "/admin/inicio",
    "/admin/facturas",
    "/admin/cotizaciones",
    "/admin/pedidosproveedores",
    "/admin/ventasperiodo",
    "/admin/comprasproveedores",
    "/admin/facturacionperiodo",
    "/admin/productosmasvendidos",
    "/admin/clientesdestacados",
    "/admin/proveedoresfrecuentes",
    "/admin/graficasventas",
    "/admin/proyecciondemanda",
    "/admin/configuracionempresa",
  ];

  // 🔹 Actualizar progreso según páginas visitadas
  useEffect(() => {
    // Si salimos del admin → reiniciar progreso
    if (!location.pathname.startsWith("/admin")) {
      setVisitadas(new Set());
      setProgreso(0);
      return;
    }

    setVisitadas((prev) => {
      const nuevas = new Set(prev);
      nuevas.add(location.pathname);
      setProgreso((nuevas.size / subpaginasAdmin.length) * 100);
      return nuevas;
    });
  }, [location.pathname]);

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "white",
        background: "linear-gradient(180deg, #0b0b0b 0%, #1a0000 100%)",
        padding: "50px 0 80px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container className="text-center animate__animated animate__fadeIn">
        {/* Encabezado */}
        <div className="mb-4">
          <h1 className="fw-bold text-danger">Panel de Administración</h1>
          <h4>Bienvenido{usuario ? `, ${usuario.nombre}` : ""}</h4>
          <p className="text-secondary">
            Supervisa el rendimiento del sistema y accede a todas las herramientas de gestión.
          </p>
        </div>

        {/* 👤 Tarjeta de perfil con barra dinámica */}
        <Card
          className="bg-dark text-light border-0 shadow-lg mb-5 mx-auto"
          style={{
            maxWidth: "500px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #1a0000 0%, #111 100%)",
          }}
        >
          <Card.Body className="d-flex flex-column align-items-center">
            <PersonCircle size={70} color="#ff4040" className="mb-3" />
            <h5 className="fw-bold mb-1">
              {usuario ? `${usuario.nombre} ${usuario.apellido}` : "Administrador"}
            </h5>
            <p className="text-secondary small mb-3">
              {usuario ? usuario.correo : "usuario@gamarepuestos.com"}
            </p>    
          </Card.Body>
        </Card>

        {/* Indicadores principales */}
        <Row className="g-4 justify-content-center mb-5">
          <Col xs={12} sm={6} lg={3}>
            <Card className="bg-dark text-light border-danger shadow-lg stat-card">
              <Card.Body>
                <CartFill size={35} color="#ff4040" />
                <h6 className="fw-bold mt-3">Ventas del mes</h6>
                <h2 className="fw-bold text-danger">$8.240.000</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <Card className="bg-dark text-light border-danger shadow-lg stat-card">
              <Card.Body>
                <BoxSeam size={35} color="#ff4040" />
                <h6 className="fw-bold mt-3">Productos activos</h6>
                <h2 className="fw-bold text-danger">243</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <Card className="bg-dark text-light border-danger shadow-lg stat-card">
              <Card.Body>
                <AwardFill size={35} color="#ff4040" />
                <h6 className="fw-bold mt-3">Clientes destacados</h6>
                <h2 className="fw-bold text-danger">12</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <Card className="bg-dark text-light border-danger shadow-lg stat-card">
              <Card.Body>
                <CurrencyDollar size={35} color="#ff4040" />
                <h6 className="fw-bold mt-3">Gastos del mes</h6>
                <h2 className="fw-bold text-danger">$3.540.000</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* 🔻 Secciones de acceso rápido */}
        <Row className="g-4 justify-content-center">
          <Col xs={12} md={6} lg={3}>
            <Card
              className="text-center shadow-lg border-danger h-100 bg-dark text-light card-hover"
              onClick={() => navigate("/admin/facturas")}
            >
              <Card.Body>
                <FileEarmarkTextFill size={45} color="#ff4040" className="mb-3" />
                <Card.Title>Documentos</Card.Title>
                <Card.Text>Facturas, cotizaciones y pedidos de proveedores.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <Card
              className="text-center shadow-lg border-danger h-100 bg-dark text-light card-hover"
              onClick={() => navigate("/admin/ventasperiodo")}
            >
              <Card.Body>
                <BarChartFill size={45} color="#ff4040" className="mb-3" />
                <Card.Title>Reportes</Card.Title>
                <Card.Text>Ventas, compras y facturación por períodos.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <Card
              className="text-center shadow-lg border-danger h-100 bg-dark text-light card-hover"
              onClick={() => navigate("/admin/productosmasvendidos")}
            >
              <Card.Body>
                <GraphUpArrow size={45} color="#ff4040" className="mb-3" />
                <Card.Title>Estadísticas</Card.Title>
                <Card.Text>
                  Productos más vendidos, clientes destacados, gráficos.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <Card
              className="text-center shadow-lg border-danger h-100 bg-dark text-light card-hover"
              onClick={() => navigate("/admin/configuracionempresa")}
            >
              <Card.Body>
                <GearFill size={45} color="#ff4040" className="mb-3" />
                <Card.Title>Configuración</Card.Title>
                <Card.Text>Ajustes del sistema y gestión empresarial.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>
        {`
          .card-hover:hover {
            transform: scale(1.05);
            box-shadow: 0 0 25px rgba(255, 64, 64, 0.6);
          }

          .stat-card {
            border-radius: 15px;
            transition: all 0.3s ease-in-out;
          }

          .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 0 20px rgba(255, 64, 64, 0.4);
          }

          .animate__animated {
            animation-duration: 0.8s;
          }
        `}
      </style>
    </div>
  );
}
