import React from "react";
import { Container, Card, Row, Col, Image } from "react-bootstrap";

export default function Acerca() {
  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <Row className="align-items-center">
          <Col md={4} className="text-center mb-3 mb-md-0">
            <Image
             src="/imagenes/logo192x192.png"
         
         
              alt="Logo Gama Repuestos"
              roundedCircle
              fluid
              style={{ width: "180px", height: "180px" }}
            />
          </Col>

          <Col md={8}>
            <h2 className="text-danger mb-3">Acerca del Sistema</h2>
            <p>
              El sistema <strong>Gama Repuestos Quibdó</strong> es una
              aplicación web desarrollada para la gestión integral de
              repuestos, ventas, proveedores y reportes empresariales.
            </p>

            <p>
              Permite administrar el inventario, generar cotizaciones,
              facturas, gestionar usuarios, roles, y realizar análisis
              estadísticos de las ventas, todo desde una interfaz moderna e
              intuitiva.
            </p>

            <hr className="border-secondary" />

            <h5 className="text-warning">Versión del Sistema:</h5>
            <p>v1.0.0 (Enero 2025)</p>

            <h5 className="text-warning">Desarrolladores:</h5>
            <ul>
              <li>Juan Sebastian Nieva Gonzalez – Desarrollo Backend e Integración MySQL</li>
              <li>Juan Carlos Mosquera Marin    – Desarrollo Backend e Integración MySQL</li>
              <li>Rosa Milena Gamboa Mena       – Desarrollo Backend e Integración MySQL</li>
            </ul>

            <h5 className="text-warning">Contacto de Soporte:</h5>
            <p>
              Correo:{" "}
              <a
                href="mailto:soporte@gamarepuestos.com"
                className="text-danger text-decoration-none"
              >
                soporte@gamarepuestos.com
              </a>
            </p>
            <p>
              Teléfono:{" "}
              <a
                href="tel:+573105098959"
                className="text-danger text-decoration-none"
              >
                +57 3105098959
              </a>
            </p>

            <hr className="border-secondary" />
            <p className="text-secondary small mt-3">
              © 2025 Gama Repuestos Quibdó — Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
