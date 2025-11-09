import React from "react";
import { Container, Card, Row, Col, Ratio } from "react-bootstrap";

export default function Tutoriales() {
  const tutoriales = [
    {
      id: 1,
      titulo: "Registro de Productos",
      descripcion: "Aprende cómo registrar y actualizar productos dentro del sistema.",
      enlace: "", // Reemplázalo con tu propio enlace
    },
    {
      id: 2,
      titulo: "Ventas y Facturación",
      descripcion: "Guía para registrar ventas, aplicar descuentos y generar facturas en PDF.",
      enlace: "", // Ejemplo
    },
    {
      id: 3,
      titulo: "Gestión de Inventario",
      descripcion: "Cómo consultar, actualizar y filtrar el stock de productos.",
      enlace: "",
    },
    {
      id: 4,
      titulo: "Usuarios y Roles",
      descripcion: "Tutorial sobre la creación de usuarios, asignación de roles y permisos.",
      enlace: "",
    },
  ];

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Tutoriales del Sistema</h2>
        <p className="text-center text-light mb-5">
          Aprende a manejar el sistema de gestión <strong>Gama Repuestos Quibdó</strong> 
          con estos videos cortos explicativos.
        </p>

        <Row className="gy-4">
          {tutoriales.map((tut) => (
            <Col key={tut.id} md={6} lg={6}>
              <Card className="bg-secondary text-light border-0 shadow-sm h-100">
                <Card.Body>
                  <h5 className="text-warning">{tut.titulo}</h5>
                  <p className="small">{tut.descripcion}</p>
                  <div className="ratio ratio-16x9 mb-2">
                    <iframe
                      src={tut.enlace}
                      title={tut.titulo}
                      allowFullScreen
                    ></iframe>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4">
          <p className="text-secondary small">
            © 2025 Gama Repuestos Quibdó - Todos los derechos reservados
          </p>
        </div>
      </Card>
    </Container>
  );
}
