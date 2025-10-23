import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./RecuperarContraseña.css";

export default function RecuperarContraseña() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      setMensaje("❌ Por favor ingresa tu correo electrónico.");
      return;
    }

    // Simula envío de correo de recuperación
    setMensaje(`✅ Se ha enviado un enlace de recuperación a ${email}`);
    setEmail("");
  };

  return (
    <div className="forgot-container">
      {/* Panel izquierdo */}
      <div className="forgot-left text-center text-light d-flex flex-column justify-content-center align-items-center">
        <div>
          <h1 className="fw-bold titulo">Recupera tu acceso</h1>
          <h2 className="marca">Gama Repuestos Quibdó</h2>
          <p className="slogan">Te ayudaremos a volver a ingresar</p>
        </div>
        <img
          src="/imagenes/android-chrome-192x192.png"
          alt="Logo Gama"
          className="forgot-logo mt-3"
        />
      </div>

      {/* Panel derecho */}
      <div className="forgot-right d-flex align-items-center justify-content-center">
        <Card className="forgot-card shadow-lg p-4">
          <h3 className="text-center text-danger mb-4">Olvidé mi contraseña</h3>

          {mensaje && (
            <Alert variant={mensaje.includes("✅") ? "success" : "danger"}>
              {mensaje}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ej: usuario@correo.com"
                required
              />
            </Form.Group>

            <Button type="submit" variant="danger" className="w-100">
              Enviar enlace de recuperación
            </Button>

            <div className="text-center mt-3 small">
              <Link to="/login" className="text-danger text-decoration-none">
                ← Volver al inicio de sesión
              </Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}
