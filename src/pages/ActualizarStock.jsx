import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container, Spinner, Alert } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";

export default function ActualizarStock() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevoStock, setNuevoStock] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMsg, setTipoMsg] = useState("info");
  const [cargando, setCargando] = useState(false);

  const API_URL = "http://localhost:8001/stock";
  const API_PRODUCTOS = "http://localhost:8001/productos";

  // 🎨 Estilos personalizados del menú desplegable
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#212529",
      borderColor: state.isFocused ? "#dc3545" : "#444",
      color: "white",
      boxShadow: state.isFocused ? "0 0 0 1px #dc3545" : "none",
      "&:hover": {
        borderColor: "#dc3545",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    input: (base) => ({
      ...base,
      color: "white",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#212529",
      color: "white",
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#dc3545" // 🔴 Color de fondo al seleccionar
        : state.isFocused
        ? "#66171a" // 🔴 Color al pasar el mouse
        : "#212529", // 🔴 Fondo normal
      color: state.isSelected ? "white" : "white",
      cursor: "pointer",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#aaa",
    }),
  };

  // 🔄 Cargar todos los productos una vez
  const cargarProductos = async () => {
    try {
      const res = await axios.get(API_PRODUCTOS);
      setProductos(
        res.data.map((p) => ({
          value: p.id_producto,
          label: p.nombre_producto,
        }))
      );
    } catch (e) {
      console.error("Error al cargar productos:", e);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // 🧩 Cuando se selecciona un producto
  const handleProductoChange = async (opt) => {
    if (!opt) {
      setProductoSeleccionado(null);
      return;
    }

    setCargando(true);
    try {
      const res = await axios.get(`${API_URL}/buscar/${opt.label}`);
      if (res.data.length > 0) {
        setProductoSeleccionado(res.data[0]);
        setMensaje("");
      } else {
        setProductoSeleccionado(null);
        setMensaje("⚠️ No se encontró el producto");
      }
    } catch (e) {
      setMensaje("❌ Error al buscar producto");
    } finally {
      setCargando(false);
    }
  };

  // 🧮 Actualizar el stock
  const actualizarStock = async () => {
    if (!productoSeleccionado || !nuevoStock) {
      setMensaje("⚠️ Selecciona un producto e ingresa una cantidad válida");
      setTipoMsg("warning");
      return;
    }

    setCargando(true);
    try {
      const res = await axios.put(
        `${API_URL}/actualizar/${productoSeleccionado.id_producto}/${nuevoStock}`
      );
      setMensaje(res.data.mensaje);
      setTipoMsg("success");

      setProductoSeleccionado({
        ...productoSeleccionado,
        stock_actual: nuevoStock,
      });
      setNuevoStock("");
    } catch (e) {
      setMensaje("❌ Error al actualizar stock");
      setTipoMsg("danger");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">Actualizar Stock</h2>

        {mensaje && (
          <Alert variant={tipoMsg} className="text-center fw-bold">
            {mensaje}
          </Alert>
        )}

        <Form>
          {/* 🔍 Buscar producto */}
          <Form.Group className="mb-3">
            <Form.Label>Buscar Producto</Form.Label>
            <Select
              styles={selectStyles}
              options={productos}
              placeholder="Escribe el nombre del producto..."
              onChange={handleProductoChange}
              isClearable
              isSearchable
            />
          </Form.Group>

          {productoSeleccionado && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={productoSeleccionado.nombre}
                  className="bg-secondary text-light"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Stock Actual</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={productoSeleccionado.stock_actual}
                  className="bg-secondary text-light"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Stock Mínimo</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={productoSeleccionado.stock_minimo}
                  className="bg-secondary text-light"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nuevo Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese nueva cantidad"
                  value={nuevoStock}
                  onChange={(e) => setNuevoStock(e.target.value)}
                  className="bg-light text-dark"
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  variant="danger"
                  onClick={actualizarStock}
                  disabled={cargando}
                >
                  {cargando ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Actualizar"
                  )}
                </Button>
              </div>
            </>
          )}
        </Form>
      </Card>
    </Container>
  );
}
