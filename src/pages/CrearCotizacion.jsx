import React, { useEffect, useState } from "react";
import { obtenerClientes, obtenerProductos, crearCotizacion } from "../services/cotizacionService";
import { Button, Form, Card, Alert, Spinner } from "react-bootstrap";

export default function CrearCotizacion() {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({ id_cliente: "", id_producto: "", cantidad: "" });
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [clientesData, productosData] = await Promise.all([
          obtenerClientes(),
          obtenerProductos(),
        ]);
        setClientes(clientesData);
        setProductos(productosData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await CrearCotizacion(formData);
      setMensaje(`✅ Cotización creada con ID: ${res.id_cotizacion}`);
      setFormData({ id_cliente: "", id_producto: "", cantidad: "" });
    } catch (error) {
      setMensaje("❌ Error al crear la cotización");
    }
  };

  if (cargando) {
    return (
      <div className="text-center mt-5 text-light">
        <Spinner animation="border" variant="light" /> Cargando datos...
      </div>
    );
  }

  return (
    <Card className="p-4 bg-dark text-light shadow">
      <h2 className="text-center text-danger mb-4">Crear Cotización</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Cliente</Form.Label>
          <Form.Select name="id_cliente" value={formData.id_cliente} onChange={handleChange} required>
            <option value="">Seleccione un cliente</option>
            {clientes.map((cli) => (
              <option key={cli.id_cliente} value={cli.id_cliente}>
                {cli.nombre}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Producto</Form.Label>
          <Form.Select name="id_producto" value={formData.id_producto} onChange={handleChange} required>
            <option value="">Seleccione un producto</option>
            {productos.map((prod) => (
              <option key={prod.id_producto} value={prod.id_producto}>
                {prod.nombre_producto}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            placeholder="Cantidad"
            required
          />
        </Form.Group>

        <Button variant="danger" type="submit" className="w-100">
          + Agregar a Cotización
        </Button>
      </Form>

      {mensaje && <Alert className="mt-3 text-center">{mensaje}</Alert>}
    </Card>
  );
}
