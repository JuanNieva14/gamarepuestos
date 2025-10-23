import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Table,
  Alert,
  Badge,
} from "react-bootstrap";

export default function VentaProductos() {
  const [ventas, setVentas] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  const [formData, setFormData] = useState({
    cliente: "",
    producto: "",
    cantidad: "",
    precio_unitario: "",
    forma_pago: "Efectivo",
    fecha: new Date().toISOString().split("T")[0],
  });

  // Lista simulada de productos disponibles
  const productosDisponibles = [
    { nombre: "Aceite 20W50", precio: 25000 },
    { nombre: "Pastillas de freno", precio: 18000 },
    { nombre: "Bujía NGK", precio: 12000 },
    { nombre: "Filtro de aire", precio: 15000 },
    { nombre: "Cadena reforzada", precio: 50000 },
    { nombre: "Llanta delantera 2.50-17", precio: 80000 },
    { nombre: "Amortiguador trasero", precio: 95000 },
    { nombre: "Disco de freno", precio: 70000 },
    { nombre: "Cables de acelerador", precio: 10000 },
    { nombre: "Aceite de caja 10W40", precio: 27000 },
  ];

  // Mostrar mensaje temporal
  const showMsg = (texto, ms = 2500) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(null), ms);
  };

  // Manejo de cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si selecciona un producto, autocompletar su precio
    if (name === "producto") {
      const seleccionado = productosDisponibles.find((p) => p.nombre === value);
      setFormData({
        ...formData,
        producto: value,
        precio_unitario: seleccionado ? seleccionado.precio : "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Registrar venta
  const handleSubmit = (e) => {
    e.preventDefault();
    const { cliente, producto, cantidad, precio_unitario, forma_pago } = formData;

    if (!cliente || !producto || !cantidad || !precio_unitario) {
      showMsg("❌ Todos los campos son obligatorios.");
      return;
    }

    const total = parseFloat(cantidad) * parseFloat(precio_unitario);

    const nuevaVenta = {
      id_venta: Date.now(),
      ...formData,
      total,
    };

    setVentas([nuevaVenta, ...ventas]);
    showMsg("✅ Venta registrada correctamente.");

    setFormData({
      cliente: "",
      producto: "",
      cantidad: "",
      precio_unitario: "",
      forma_pago: "Efectivo",
      fecha: new Date().toISOString().split("T")[0],
    });
  };

  // 🖨️ Imprimir factura directamente
  const imprimirFactura = (venta) => {
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Factura Gama Repuestos Quibdó</title>
          <style>
            body { font-family: Arial; margin: 30px; }
            h1, h2 { color: #c00; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #999; padding: 8px; text-align: center; }
            th { background-color: #eee; }
            .total { font-size: 18px; font-weight: bold; color: #222; text-align: right; margin-top: 20px; }
          </style>
        </head>
        <body>
          <h1>Gama Repuestos Quibdó</h1>
          <h2>Factura de Venta N° ${venta.id_venta}</h2>
          <p><strong>Cliente:</strong> ${venta.cliente}</p>
          <p><strong>Fecha:</strong> ${venta.fecha}</p>
          <p><strong>Forma de pago:</strong> ${venta.forma_pago}</p>

          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${venta.producto}</td>
                <td>${venta.cantidad}</td>
                <td>$${parseFloat(venta.precio_unitario).toLocaleString()}</td>
                <td>$${venta.total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <p class="total">Valor Total: $${venta.total.toLocaleString()}</p>
          <p style="text-align:center; margin-top:40px;">Gracias por su compra.</p>
        </body>
      </html>
    `);
    ventana.document.close();
    ventana.print();
  };

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">Registro de Ventas</h2>

        {mensaje && (
          <Alert
            variant={
              mensaje.startsWith("✅")
                ? "success"
                : mensaje.startsWith("❌")
                ? "danger"
                : "warning"
            }
            className="text-center"
          >
            {mensaje}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              type="text"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Producto</Form.Label>
            <Form.Select
              name="producto"
              value={formData.producto}
              onChange={handleChange}
            >
              <option value="">Seleccione un producto</option>
              {productosDisponibles.map((p, index) => (
                <option key={index} value={p.nombre}>
                  {p.nombre}
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
              placeholder="Ej: 3"
              min="1"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio Unitario (COP)</Form.Label>
            <Form.Control
              type="number"
              name="precio_unitario"
              value={formData.precio_unitario}
              onChange={handleChange}
              placeholder="Ej: 15000"
              min="0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Forma de Pago</Form.Label>
            <Form.Select
              name="forma_pago"
              value={formData.forma_pago}
              onChange={handleChange}
            >
              <option>Efectivo</option>
              <option>Transferencia</option>
              <option>Tarjeta Débito</option>
              <option>Tarjeta Crédito</option>
              <option>Nequi</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
            />
          </Form.Group>

          {formData.cantidad && formData.precio_unitario && (
            <div className="text-end text-success mb-3">
              <strong>
                Total: $
                {(
                  parseFloat(formData.cantidad) *
                  parseFloat(formData.precio_unitario)
                ).toLocaleString()}
              </strong>
            </div>
          )}

          <div className="text-center">
            <Button variant="danger" type="submit" className="px-5">
              💾 Registrar Venta
            </Button>
          </div>
        </Form>
      </Card>

      {/* 📋 Tabla de ventas */}
      <Card className="p-4 mt-4 shadow bg-dark text-light border-0">
        <h4 className="text-center text-danger mb-3">Ventas Registradas</h4>
        <Table striped bordered hover variant="dark" className="text-center align-middle">
          <thead>
            <tr>
              <th>ID Venta</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Valor Total</th>
              <th>Forma de Pago</th>
              <th>Fecha</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length === 0 ? (
              <tr>
                <td colSpan={8}>No hay ventas registradas.</td>
              </tr>
            ) : (
              ventas.map((v) => (
                <tr key={v.id_venta}>
                  <td>{v.id_venta}</td>
                  <td>{v.cliente}</td>
                  <td>{v.producto}</td>
                  <td>{v.cantidad}</td>
                  <td>${v.total.toLocaleString()}</td>
                  <td>
                    <Badge bg="secondary">{v.forma_pago}</Badge>
                  </td>
                  <td>{v.fecha}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-light"
                      onClick={() => imprimirFactura(v)}
                    >
                      🖨️ Imprimir Factura
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
