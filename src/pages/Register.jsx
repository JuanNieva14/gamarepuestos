import React, { useState, useEffect } from "react";
import { registrarCuenta } from "../services/register";
import {
  Form,
  Button,
  Card,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    numero_documento: "",
    direccion: "",
    contrasena: "",
    confirmar: "",
    terminos: false,
  });

  const [usuarioGenerado, setUsuarioGenerado] = useState("");
  const [correoGenerado, setCorreoGenerado] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  // 🔄 Generar usuario y correo automáticamente
  useEffect(() => {
    const { nombre, apellido, numero_documento } = form;

    if (nombre && apellido && numero_documento) {
      const ultimosTres = numero_documento.slice(-3);

      // 👤 Usuario → primera letra + apellido + últimos 3 dígitos
      const user = (nombre[0] + apellido + ultimosTres).toLowerCase();
      setUsuarioGenerado(user);

      // 📧 Correo → nombre.apellido + últimos 3 dígitos + @gama.com
      const correo = `${nombre.toLowerCase()}.${apellido.toLowerCase()}${ultimosTres}@gama.com`;
      setCorreoGenerado(correo);
    } else {
      setUsuarioGenerado("");
      setCorreoGenerado("");
    }
  }, [form.nombre, form.apellido, form.numero_documento]);

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
      const datosEnviar = {
        ...form,
        correo: correoGenerado, // correo automático
      };

      const respuesta = await registrarCuenta(datosEnviar);

      // Mostrar modal con credenciales generadas
      setUsuarioGenerado(respuesta.usuario || usuarioGenerado);
      setCorreoGenerado(respuesta.correo || correoGenerado);
      setMostrarModal(true);
    } catch (error) {
      setMensaje({
        tipo: "danger",
        texto: error.message || "Error al registrar usuario",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    navigate("/login");
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
          <img
            src="/imagenes/logo192x192.png"
            alt="Logo Gama"
            className="logo-img"
          />
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

            {/* Usuario generado automáticamente */}
            {usuarioGenerado && (
              <p className="text-muted small mb-3">
                👤 Tu usuario asignado será: <strong>{usuarioGenerado}</strong>
              </p>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Número de documento</Form.Label>
              <Form.Control
                name="numero_documento"
                value={form.numero_documento}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Correo generado automáticamente */}
            <Form.Group className="mb-3">
              <Form.Label>
                Correo electrónico (asignado automáticamente)
              </Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={correoGenerado}
                readOnly
                className="bg-light text-muted"
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
              className="w-100 fw-bold"
              disabled={loading}
            >
              {loading ? (
                <Spinner size="sm" animation="border" />
              ) : (
                "Crear Cuenta"
              )}
            </Button>

            <p className="text-center mt-3">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-danger fw-semibold">
                Inicia sesión
              </Link>
            </p>
          </Form>
        </Card>
      </div>

      {/* 🧾 Modal de confirmación */}
      <Modal show={mostrarModal} onHide={handleCerrarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger fw-bold">
            Cuenta creada exitosamente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-2">
            👤 <strong>Usuario:</strong> {usuarioGenerado}
          </p>
          <p>
            📧 <strong>Correo asignado:</strong> {correoGenerado}
          </p>
          <p className="text-muted small">
            Guarda esta información para poder iniciar sesión más adelante.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCerrarModal}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
