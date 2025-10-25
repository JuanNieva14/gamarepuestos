import React, { useState } from "react";
import { registrarCuenta } from "../services/register";
import { Form, Button, Card, Spinner, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css"; // 🔹 Archivo CSS personalizado

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    numero_documento: "",
    correo: "",
    direccion: "",
    contrasena: "",
    confirmar: "",
    terminos: false,
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);

    if (!form.terminos) {
      setMensaje({
        tipo: "danger",
        texto: "Debes aceptar los términos y condiciones",
      });
      return;
    }

    if (form.contrasena !== form.confirmar) {
      setMensaje({ tipo: "danger", texto: "Las contraseñas no coinciden" });
      return;
    }

    setLoading(true);
    try {
      const respuesta = await registrarCuenta(form);
      setMensaje({ tipo: "success", texto: respuesta.mensaje });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMensaje({ tipo: "danger", texto: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* Panel Izquierdo */}
      <div className="register-left">
        <h2>
          Únete a <br />
          <span>Gama Repuestos Quibdó</span>
        </h2>
        <p>Haz que tu negocio crezca con nosotros</p>
        <div className="logo-section">
          <img src="/logo.png" alt="Logo Gama" className="logo-img" />
        </div>
      </div>

      {/* Panel Derecho */}
      <div className="register-right">
        <Card className="p-4 shadow-lg">
          <h3 className="text-center text-danger mb-4">Crear Cuenta</h3>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex gap-2">
              <Form.Group className="mb-3 flex-fill">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 flex-fill">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Número de documento</Form.Label>
              <Form.Control
                name="numero_documento"
                value={form.numero_documento}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Form.Group className="mb-3 flex-fill">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="contrasena"
                  value={form.contrasena}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 flex-fill">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmar"
                  value={form.confirmar}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="terminos"
                label={
                  <>
                    Acepto los{" "}
                    <a href="#" className="text-danger">
                      Términos y Condiciones
                    </a>
                  </>
                }
                checked={form.terminos}
                onChange={handleChange}
              />
            </Form.Group>

            {mensaje && <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>}

            <Button
              variant="danger"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" animation="border" /> : "Crear Cuenta"}
            </Button>

            <p className="text-center mt-3">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </Form>
        </Card>
      </div>
    </div>
  );
}
