import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Table,
  Alert,
  Badge,
  ListGroup,
} from "react-bootstrap";

export default function ActualizarStock() {
  const [inventario, setInventario] = useState([
    {
      id_inventario: 1,
      id_producto: 1,
      nombre: "Aceite 20W50",
      stock_actual: 34,
      stock_minimo: 8,
      fecha_actualizacion: "2023-06-03 00:01:27",
    },
    {
      id_inventario: 2,
      id_producto: 2,
      nombre: "Pastillas de freno",
      stock_actual: 32,
      stock_minimo: 10,
      fecha_actualizacion: "2024-12-17 15:22:27",
    },
    {
      id_inventario: 3,
      id_producto: 3,
      nombre: "Bujía NGK",
      stock_actual: 98,
      stock_minimo: 5,
      fecha_actualizacion: "2025-07-03 21:13:56",
    },
    {
      id_inventario: 4,
      id_producto: 4,
      nombre: "Filtro de aire",
      stock_actual: 98,
      stock_minimo: 5,
      fecha_actualizacion: "2025-03-19 01:13:39",
    },
    {
      id_inventario: 5,
      id_producto: 5,
      nombre: "Cadena reforzada",
      stock_actual: 43,
      stock_minimo: 5,
      fecha_actualizacion: "2024-05-01 23:32:44",
    },
  ]);

  const [formData, setFormData] = useState({
    id_inventario: "",
    nombre: "",
    stock_actual: "",
    stock_minimo: "",
    nuevo_stock: "",
  });

  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  // 💬 Mostrar mensaje temporal
  const showMsg = (texto, ms = 2500) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(null), ms);
  };

  // 🔍 Búsqueda en tiempo real
  const handleBuscar = (e) => {
    const texto = e.target.value;
    setBusqueda(texto);

    if (texto.trim() === "") {
      setResultados([]);
      return;
    }

    const coincidencias = inventario.filter((p) =>
      p.nombre.toLowerCase().includes(texto.toLowerCase())
    );

    setResultados(coincidencias);
  };

  // 🖱️ Seleccionar producto de la búsqueda
  const seleccionarProducto = (producto) => {
    setFormData({
      id_inventario: producto.id_inventario,
      nombre: producto.nombre,
      stock_actual: producto.stock_actual,
      stock_minimo: producto.stock_minimo,
      nuevo_stock: "",
    });
    setBusqueda(producto.nombre);
    setResultados([]);
  };

  // 💾 Actualizar stock
  const handleSubmit = (e) => {
    e.preventDefault();

    const { id_inventario, nuevo_stock } = formData;
    const cantidad = parseInt(nuevo_stock);

    if (!id_inventario || isNaN(cantidad)) {
      showMsg("❌ Debes seleccionar un producto y escribir una cantidad válida.");
      return;
    }

    if (cantidad < 0) {
      showMsg("⚠️ No se permiten cantidades negativas.");
      return;
    }

    const fecha = new Date().toISOString().replace("T", " ").substring(0, 19);

    setInventario(
      inventario.map((item) =>
        item.id_inventario === parseInt(id_inventario)
          ? {
              ...item,
              stock_actual: cantidad,
              fecha_actualizacion: fecha,
            }
          : item
      )
    );

    showMsg("✅ Stock actualizado correctamente.");

    setFormData({
      id_inventario: "",
      nombre: "",
      stock_actual: "",
      stock_minimo: "",
      nuevo_stock: "",
    });
    setBusqueda("");
  };

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">Actualizar Stock</h2>

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

        {/* 🔍 Barra de búsqueda */}
        <Form.Group className="mb-3 position-relative">
          <Form.Label>Buscar Producto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escribe el nombre del producto..."
            value={busqueda}
            onChange={handleBuscar}
            autoComplete="off"
          />

          {/* 🔽 Resultados dinámicos */}
          {resultados.length > 0 && (
            <ListGroup
              className="position-absolute w-100"
              style={{
                zIndex: 10,
                maxHeight: "180px",
                overflowY: "auto",
              }}
            >
              {resultados.map((item) => (
                <ListGroup.Item
                  key={item.id_inventario}
                  action
                  onClick={() => seleccionarProducto(item)}
                >
                  {item.nombre}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Form.Group>

        {/* 🧾 Formulario */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={formData.nombre} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock Actual</Form.Label>
            <Form.Control type="number" value={formData.stock_actual} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock Mínimo</Form.Label>
            <Form.Control type="number" value={formData.stock_minimo} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nuevo Stock</Form.Label>
            <Form.Control
              type="number"
              name="nuevo_stock"
              value={formData.nuevo_stock}
              onChange={(e) =>
                setFormData({ ...formData, nuevo_stock: e.target.value })
              }
              placeholder="Ingrese nueva cantidad"
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="danger" type="submit" className="px-5">
              🔄 Actualizar
            </Button>
          </div>
        </Form>
      </Card>

      {/* 📋 Tabla */}
      <Card className="p-4 mt-4 shadow bg-dark text-light border-0">
        <h4 className="text-center text-danger mb-3">Inventario Actual</h4>
        <Table
          striped
          bordered
          hover
          variant="dark"
          className="text-center align-middle"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Stock Actual</th>
              <th>Stock Mínimo</th>
              <th>Estado</th>
              <th>Última Actualización</th>
            </tr>
          </thead>
          <tbody>
            {inventario.map((item) => (
              <tr key={item.id_inventario}>
                <td>{item.id_inventario}</td>
                <td>{item.nombre}</td>
                <td>{item.stock_actual}</td>
                <td>{item.stock_minimo}</td>
                <td>
                  <Badge
                    bg={
                      item.stock_actual === 0
                        ? "danger"
                        : item.stock_actual <= item.stock_minimo
                        ? "warning"
                        : "success"
                    }
                  >
                    {item.stock_actual === 0
                      ? "Agotado"
                      : item.stock_actual <= item.stock_minimo
                      ? "Bajo"
                      : "Disponible"}
                  </Badge>
                </td>
                <td>{item.fecha_actualizacion}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
