import React, { useState } from "react";
import { Form, Button, Row, Col, Card, Alert } from "react-bootstrap";

export default function Estados() {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    categoria: "",
    clasificacion: "",
    estado: "",
    precioCompra: "",
    precioVenta: "",
    activo: true,
  });

  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto registrado:", formData);
    setMensaje(`✅ Producto "${formData.nombre}" registrado correctamente.`);
    setFormData({
      codigo: "",
      nombre: "",
      descripcion: "",
      categoria: "",
      clasificacion: "",
      estado: "",
      precioCompra: "",
      precioVenta: "",
      activo: true,
    });
  };

  return (
    <Card className="shadow-sm p-4 bg-dark text-light border-danger">
      <h3 className="mb-3 text-center text-danger">Registro de Productos</h3>

      {mensaje && <Alert variant="success">{mensaje}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Código *</Form.Label>
              <Form.Control
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={8}>
            <Form.Group>
              <Form.Label>Nombre del Producto *</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Categoría *</Form.Label>
              <Form.Select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option>Motor</option>
                <option>Transmisión</option>
                <option>Frenos</option>
                <option>Suspensión</option>
                <option>Luces</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Clasificación *</Form.Label>
              <Form.Select
                name="clasificacion"
                value={formData.clasificacion}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option>Original</option>
                <option>Genérico</option>
                <option>Reacondicionado</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Estado *</Form.Label>
              <Form.Select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option>Disponible</option>
                <option>Agotado</option>
                <option>En pedido</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Precio de compra</Form.Label>
              <Form.Control
                type="number"
                name="precioCompra"
                step="0.01"
                value={formData.precioCompra}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Precio de venta *</Form.Label>
              <Form.Control
                type="number"
                name="precioVenta"
                step="0.01"
                value={formData.precioVenta}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Check
          type="switch"
          id="activo"
          label="Activo"
          name="activo"
          checked={formData.activo}
          onChange={handleChange}
        />

        <div className="text-center mt-3">
          <Button variant="danger" type="submit">
            Registrar Producto
          </Button>
        </div>
      </Form>
    </Card>
  );
}
