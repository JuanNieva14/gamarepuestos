import React, { useState } from "react";
import { Form, Button, Card, Spinner, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { loginUsuario } from "../services/login";
import "./Login.css"; // 🔹 Importa los estilos personalizados

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ usuario: "", contrasena: "" });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const respuesta = await loginUsuario(formData);

      // ✅ Guardar usuario en localStorage (para ProtectedRoute)
      localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));

      // ✅ Redirigir a la página principal
      navigate("/inicio");
    } catch (err) {
      console.error("Error de login:", err);
      setError("Usuario o contraseña incorrectos");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      {/* Panel Izquierdo */}
      <div className="login-left">
        <h2>
          Bienvenido a <br />
          <span>Gama Repuestos Quibdó</span>
        </h2>
        <p>La fuerza del motor está en tus manos</p>
        <div className="logo-section">
          <img src="/logo.png" alt="Logo Gama" className="logo-img" />
        </div>
      </div>

      {/* Panel Derecho */}
      <div className="login-right">
        <Card className="p-4 shadow-lg">
          <h3 className="text-center text-danger mb-4">Iniciar Sesión</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                placeholder="Ej: usuario@correo.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                placeholder=""
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button
              variant="danger"
              type="submit"
              className="w-100 mt-2"
              disabled={cargando}
            >
              {cargando ? <Spinner size="sm" animation="border" /> : "Ingresar"}
            </Button>

            <div className="text-center mt-3">
              <p>
                ¿No tienes cuenta?{" "}
                <Link to="/register" className="text-danger">
                  Regístrate aquí
                </Link>
              </p>
              <Link to="/recuperarcontraseña" className="text-danger">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}
