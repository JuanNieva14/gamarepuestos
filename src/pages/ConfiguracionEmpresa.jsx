import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col, Image } from "react-bootstrap";

export default function ConfiguracionEmpresa() {
  const [config, setConfig] = useState({
    nombreComercial: "Gama Repuestos Quibdó",
    nit: "901234567-8",
    direccion: "Cra 10 #12-34, Quibdó, Chocó",
    correo: "contacto@gamarepuestos.com",
    telefono: "+57 312 345 6789",
    logo: "/imagenes/android-chrome-192x192.png",
  });

  const [editando, setEditando] = useState(false);
  const [nuevaConfig, setNuevaConfig] = useState(config);

  const handleChange = (e) => {
    setNuevaConfig({ ...nuevaConfig, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    setConfig(nuevaConfig);
    setEditando(false);
    alert("✅ Configuración actualizada correctamente");
  };

  const handleLogoChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const url = URL.createObjectURL(archivo);
      setNuevaConfig({ ...nuevaConfig, logo: url });
    }
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Configuración de la Empresa</h2>

        <Row className="align-items-center mb-4">
          <Col md={3} className="text-center">
            <Image
              src={config.logo}
              alt="Logo Empresa"
              rounded
              fluid
              className="border border-light p-2"
            />
            {editando && (
              <Form.Group className="mt-3">
                <Form.Label>Cambiar logo</Form.Label>
                <Form.Control type="file" onChange={handleLogoChange} />
              </Form.Group>
            )}
          </Col>

          <Col md={9}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre Comercial</Form.Label>
                <Form.Control
                  type="text"
                  name="nombreComercial"
                  value={nuevaConfig.nombreComercial}
                  onChange={handleChange}
                  disabled={!editando}
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>NIT</Form.Label>
                    <Form.Control
                      type="text"
                      name="nit"
                      value={nuevaConfig.nit}
                      onChange={handleChange}
                      disabled={!editando}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="text"
                      name="telefono"
                      value={nuevaConfig.telefono}
                      onChange={handleChange}
                      disabled={!editando}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="correo"
                  value={nuevaConfig.correo}
                  onChange={handleChange}
                  disabled={!editando}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="direccion"
                  value={nuevaConfig.direccion}
                  onChange={handleChange}
                  disabled={!editando}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>

        <div className="text-center mt-4">
          {!editando ? (
            <Button variant="danger" size="lg" onClick={() => setEditando(true)}>
              Editar Información
            </Button>
          ) : (
            <Button variant="success" size="lg" onClick={handleGuardar}>
              Guardar Cambios
            </Button>
          )}
        </div>
      </Card>
    </Container>
  );
}
