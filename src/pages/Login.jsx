import React, { useState } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false); // ✅ estado del spinner
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCargando(true); // ✅ muestra el spinner
    setMensaje(null);

    setTimeout(() => {
      if (formData.email === "admin@gama.com" && formData.password === "1234") {
        localStorage.setItem("isLoggedIn", "true"); // guarda sesión
        setMensaje("✅ Inicio de sesión exitoso");
        setTimeout(() => navigate("/"), 1200);
      } else {
        setMensaje("❌ Credenciales incorrectas");
      }
      setCargando(false); // ✅ oculta el spinner
    }, 1500); // simula una espera de red
  };

  return (
    <div className="login-container">
      {/* Panel izquierdo */}
      <div className="login-left text-center text-light d-flex flex-column justify-content-center align-items-center">
        <div>
          <h1 className="fw-bold titulo">Bienvenido a</h1>
          <h2 className="marca">Gama Repuestos Quibdó</h2>
          <p className="slogan">La fuerza del motor está en tus manos</p>
        </div>
        <img
          src="/imagenes/android-chrome-192x192.png"
          alt="Logo Gama"
          className="login-logo mt-3"
        />
      </div>

      {/* Panel derecho */}
      <div className="login-right d-flex align-items-center justify-content-center">
        <Card className="login-card shadow-lg p-4">
          <h3 className="text-center text-danger mb-4">Iniciar Sesión</h3>

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
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ej: usuario@correo.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                required
              />
            </Form.Group>

            {/* ✅ Botón con spinner */}
            <div className="text-center">
              <Button
                type="submit"
                variant="danger"
                className="w-100 d-flex justify-content-center align-items-center"
                disabled={cargando}
              >
                {cargando ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Iniciando sesión...
                  </>
                ) : (
                  "Ingresar"
                )}
              </Button>
            </div>

            <p className="text-center mt-3 small">
              ¿No tienes cuenta?{" "}
              <Link to="/register" className="text-danger text-decoration-none">
                Regístrate aquí
              </Link>
            </p>

            <div className="text-center mt-2 small">
              <Link
                to="/recuperarcontraseña"
                className="forgot-link text-decoration-none"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}
