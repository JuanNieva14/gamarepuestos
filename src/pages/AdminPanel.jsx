import React from "react";
import { Container, Card } from "react-bootstrap";

export default function AdminPanel() {
  return (
    <Container className="mt-5 text-center">
      <Card className="shadow-lg p-5 bg-dark text-white rounded-4 border-danger">
        <h1 className="fw-bold text-danger mb-3">⚙️ Este es el Panel de Administración</h1>
        <p className="fs-5">
          Desde aquí podrás acceder a todas las funciones administrativas del sistema.
        </p>
      </Card>
    </Container>
  );
}
