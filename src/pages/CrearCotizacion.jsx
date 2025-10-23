import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Table,
  Alert,
  ListGroup,
} from "react-bootstrap";

export default function CrearCotizacion() {
  const [cliente, setCliente] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [cotizacion, setCotizacion] = useState([]);

  const productosDisponibles = [
    { nombre: "Aceite 20W50", precio: 25000 },
    { nombre: "Pastillas de freno", precio: 32000 },
    { nombre: "Bujía NGK", precio: 18000 },
    { nombre: "Cadena reforzada", precio: 60000 },
    { nombre: "Filtro de aire", precio: 27000 },
    { nombre: "Grasa lubricante", precio: 15000 },
    { nombre: "Llanta 120/70 R17", precio: 180000 },
    { nombre: "Kit de transmisión", precio: 220000 },
    { nombre: "Espejos laterales", precio: 40000 },
    { nombre: "Disco de freno", precio: 85000 },
  ];

  // 🔍 Búsqueda en tiempo real
  const handleBuscar = (e) => {
    const texto = e.target.value;
    setBusqueda(texto);

    if (texto.trim() === "") {
      setResultados([]);
      return;
    }

    const coincidencias = productosDisponibles.filter((p) =>
      p.nombre.toLowerCase().includes(texto.toLowerCase())
    );
    setResultados(coincidencias);
  };

  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setBusqueda(producto.nombre);
    setResultados([]);
  };

  const handleAgregar = () => {
    if (!productoSeleccionado || !cantidad) {
      setMensaje("⚠️ Selecciona un producto y una cantidad válida.");
      setTimeout(() => setMensaje(null), 2500);
      return;
    }

    const nuevo = {
      producto: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      cantidad: parseInt(cantidad),
      total: productoSeleccionado.precio * parseInt(cantidad),
    };

    setCotizacion([...cotizacion, nuevo]);
    setProductoSeleccionado(null);
    setBusqueda("");
    setCantidad("");
  };

  const calcularTotal = () => cotizacion.reduce((acc, item) => acc + item.total, 0);

  // 🖨️ Imprimir cotización directamente
  const imprimirCotizacion = () => {
    if (!cliente || cotizacion.length === 0) {
      setMensaje("❌ Debes agregar cliente y al menos un producto.");
      setTimeout(() => setMensaje(null), 2500);
      return;
    }

    const total = calcularTotal().toLocaleString();

    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Cotización - Gama Repuestos Quibdó</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; color: #222; }
            h1, h2 { color: #c00; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #999; padding: 8px; text-align: center; }
            th { background-color: #f0f0f0; }
            .total { text-align: right; font-weight: bold; margin-top: 20px; }
            .footer { text-align: center; margin-top: 40px; font-size: 13px; color: #555; }
            img { display: block; margin: 0 auto 10px; width: 80px; }
          </style>
        </head>
        <body>
          <img src="/imagenes/android-chrome-192x192.png" alt="Logo Gama Repuestos">
          <h1>GAMA REPUESTOS QUIBDÓ</h1>
          <h2>COTIZACIÓN DE PRODUCTOS</h2>

          <p><strong>Cliente:</strong> ${cliente}</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>

          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio (COP)</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${cotizacion
                .map(
                  (item) => `
                <tr>
                  <td>${item.producto}</td>
                  <td>$${item.precio.toLocaleString()}</td>
                  <td>${item.cantidad}</td>
                  <td>$${item.total.toLocaleString()}</td>
                </tr>`
                )
                .join("")}
            </tbody>
          </table>

          <p class="total">Total: $${total} COP</p>

          <div class="footer">
            <p>Gracias por preferirnos 💪</p>
            <p>Gama Repuestos Quibdó - Calle 5 #12-34, Quibdó, Chocó</p>
            <p>Tel: 312 456 7890 | Email: contacto@gamarepuestos.com</p>
          </div>
        </body>
      </html>
    `);
    ventana.document.close();
    ventana.print();
  };

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">Crear Cotización</h2>

        {mensaje && (
          <Alert
            variant={
              mensaje.startsWith("✅")
                ? "success"
                : mensaje.startsWith("⚠️")
                ? "warning"
                : "danger"
            }
            className="text-center"
          >
            {mensaje}
          </Alert>
        )}

        {/* 🧾 Formulario */}
        <Form className="mb-4">
          <Form.Group className="mb-3">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
          </Form.Group>

          {/* 🔎 Búsqueda dinámica */}
          <Form.Group className="mb-3 position-relative">
            <Form.Label>Buscar Producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escribe el nombre del producto..."
              value={busqueda}
              onChange={handleBuscar}
              autoComplete="off"
            />
            {resultados.length > 0 && (
              <ListGroup
                className="position-absolute w-100"
                style={{
                  zIndex: 10,
                  maxHeight: "180px",
                  overflowY: "auto",
                }}
              >
                {resultados.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    onClick={() => seleccionarProducto(item)}
                  >
                    {item.nombre} - ${item.precio.toLocaleString()}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Form.Group>

          {productoSeleccionado && (
            <Alert variant="secondary">
              Producto seleccionado:{" "}
              <strong>{productoSeleccionado.nombre}</strong> – Precio:{" "}
              <strong>${productoSeleccionado.precio.toLocaleString()}</strong>
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="danger" onClick={handleAgregar} className="px-4">
              ➕ Agregar a Cotización
            </Button>
          </div>
        </Form>

        {/* 📋 Tabla */}
        {cotizacion.length > 0 && (
          <Card className="p-3 bg-secondary text-light border-0 mt-3">
            <h4 className="text-center text-light mb-3">Detalle de Cotización</h4>
            <Table striped bordered hover variant="dark" className="text-center">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio (COP)</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cotizacion.map((item, index) => (
                  <tr key={index}>
                    <td>{item.producto}</td>
                    <td>${item.precio.toLocaleString()}</td>
                    <td>{item.cantidad}</td>
                    <td>${item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-end fw-bold">
                    Total:
                  </td>
                  <td className="fw-bold text-success">
                    ${calcularTotal().toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </Table>

            <div className="text-center mt-3">
              <Button variant="outline-light" onClick={imprimirCotizacion}>
                🖨️ Imprimir Cotización
              </Button>
            </div>
          </Card>
        )}
      </Card>
    </Container>
  );
}
