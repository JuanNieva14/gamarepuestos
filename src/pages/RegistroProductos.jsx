import React, { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import {
  registrarProducto,
  obtenerCategorias,
  obtenerClasificaciones,
} from "../services/RegistroProductos";

export default function RegistroProductos() {
  const [formData, setFormData] = useState({
    nombre_producto: "",
    descripcion: "",
    id_categoria: "",
    id_clasificacion: "",
    id_estado: 1,
    precio_compra: "",
    precio_venta: "",
    stock_actual: "",
    stock_minimo: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [clasificaciones, setClasificaciones] = useState([]);
  const [margen, setMargen] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const cat = await obtenerCategorias();
        const clas = await obtenerClasificaciones();
        setCategorias(cat);
        setClasificaciones(clas);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      }
    };
    cargarDatos();
  }, []);

  const calcularMargen = (compra, venta) => {
    const c = parseFloat(compra);
    const v = parseFloat(venta);
    if (c > 0 && v > 0) {
      const margenCalc = ((v - c) / c) * 100;
      setMargen(`${margenCalc.toFixed(2)}%`);
    } else {
      setMargen("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "precio_compra" || name === "precio_venta") {
      const compra = name === "precio_compra" ? value : formData.precio_compra;
      const venta = name === "precio_venta" ? value : formData.precio_venta;
      calcularMargen(compra, venta);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje(null);

    try {
      const data = await registrarProducto(formData);
      setMensaje({
        tipo: "success",
        texto: `Producto registrado correctamente | Código: ${data.codigo} | Margen: ${data.margen}`,
      });
      setFormData({
        nombre_producto: "",
        descripcion: "",
        id_categoria: "",
        id_clasificacion: "",
        id_estado: 1,
        precio_compra: "",
        precio_venta: "",
        stock_actual: "",
        stock_minimo: "",
      });
      setMargen("");
    } catch {
      setMensaje({
        tipo: "danger",
        texto: "Error al registrar el producto",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Card className="p-4 shadow-lg bg-dark text-white">
      <h3 className="text-center text-danger mb-4">Registrar Nuevo Producto</h3>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                name="nombre_producto"
                value={formData.nombre_producto}
                onChange={handleChange}
                placeholder="Ej: Aceite 10W-40 Bajaj (Original OEM)"
                className="bg-dark text-white border-danger"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                name="id_categoria"
                value={formData.id_categoria}
                onChange={handleChange}
                className="bg-dark text-white border-danger"
                required
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((c) => (
                  <option key={c.id_categoria} value={c.id_categoria}>
                    {c.nombre_categoria}
                  </option>
                ))}
              </Form.Select>
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
            placeholder="Ej: Aceite para motocicleta marca Bajaj, calidad OEM."
            className="bg-dark text-white border-danger"
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Clasificación</Form.Label>
              <Form.Select
                name="id_clasificacion"
                value={formData.id_clasificacion}
                onChange={handleChange}
                className="bg-dark text-white border-danger"
                required
              >
                <option value="">Seleccione una clasificación</option>
                {clasificaciones.map((cl) => (
                  <option
                    key={cl.id_clasificacion}
                    value={cl.id_clasificacion}
                  >
                    {cl.nombre_clasificacion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Precio Compra</Form.Label>
              <Form.Control
                type="number"
                name="precio_compra"
                value={formData.precio_compra}
                onChange={handleChange}
                className="bg-dark text-white border-danger"
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Precio Venta</Form.Label>
              <Form.Control
                type="number"
                name="precio_venta"
                value={formData.precio_venta}
                onChange={handleChange}
                className="bg-dark text-white border-danger"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Stock Actual</Form.Label>
              <Form.Control
                type="number"
                name="stock_actual"
                value={formData.stock_actual}
                onChange={handleChange}
                className="bg-dark text-white border-danger"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Stock Mínimo</Form.Label>
              <Form.Control
                type="number"
                name="stock_minimo"
                value={formData.stock_minimo}
                onChange={handleChange}
                className="bg-dark text-white border-danger"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Margen (%)</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={margen}
                className="bg-secondary text-white border-0"
              />
            </Form.Group>
          </Col>
        </Row>

        {mensaje && (
          <Alert variant={mensaje.tipo} className="text-center">
            {mensaje.texto}
          </Alert>
        )}

        <div className="text-center">
          <Button
            type="submit"
            variant="danger"
            className="fw-bold px-4"
            disabled={enviando}
          >
            {enviando ? <Spinner size="sm" animation="border" /> : "Registrar"}
          </Button>
        </div>
      </Form>
    </Card>
  );
}
