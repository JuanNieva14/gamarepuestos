import React, { useState } from "react";
import { Form, Button, Row, Col, Card, Container, Alert } from "react-bootstrap";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    direccion: "",
    password: "",
    confirmar: "",
  });
  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmar) {
      setMensaje("❌ Las contraseñas no coinciden.");
      return;
    }

    // Simula registro
    setMensaje(`✅ Usuario ${formData.nombre} registrado correctamente.`);
    console.log("Datos enviados:", formData);

    // Limpia el formulario
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      direccion: "",
      password: "",
      confirmar: "",
    });
  };

  return (
    <div className="register-container">
      {/* PANEL IZQUIERDO */}
      <div className="register-left text-center text-light d-flex flex-column justify-content-center align-items-center">
        <div>
          <h1 className="fw-bold titulo">Únete a</h1>
          <h2 className="marca">Gama Repuestos Quibdó</h2>
          <p className="slogan">Haz que tu negocio crezca con nosotros</p>
        </div>
        <img
          src="/imagenes/android-chrome-192x192.png"
          alt="Logo Gama"
          className="register-logo mt-3"
        />
      </div>

      {/* PANEL DERECHO */}
      <div className="register-right d-flex align-items-center justify-content-center">
        <Card className="register-card shadow-lg p-4">
          <h3 className="text-center text-danger mb-4">Crear Cuenta</h3>

          {mensaje && (
            <Alert variant={mensaje.includes("✅") ? "success" : "danger"}>
              {mensaje}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmar"
                    value={formData.confirmar}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Check
              type="checkbox"
              label={
                <>
                  Acepto los <a href="#" className="text-danger">Términos y Condiciones</a>
                </>
              }
              className="mb-3"
              required
            />

            <div className="text-center">
              <Button type="submit" variant="danger" className="w-100">
                Crear Cuenta
              </Button>
            </div>

            <p className="text-center mt-3 small">
              ¿Ya tienes cuenta?{" "}
              <a href="/login" className="text-danger text-decoration-none">
                Inicia sesión
              </a>
            </p>
          </Form>
        </Card>
      </div>
    </div>
  );
}
