import React, { useState, useEffect } from "react";
import {
  Container, Row, Col, Form, Button, Card, Spinner, Alert
} from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { registrarVenta } from "../services/ventaproductos";

export default function VentaProductos() {
  const API_CLIENTES = "http://localhost:8001/clientes";
  const API_PRODUCTOS = "http://localhost:8001/productos";
  const API_FORMAS = "http://localhost:8001/formas_pago";

  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [formasPago, setFormasPago] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [tipoMsg, setTipoMsg] = useState("success");
  const [cargando, setCargando] = useState(false);

  const [formVenta, setFormVenta] = useState({
    id_cliente: null,
    id_forma_pago: "",
    productos: [{ id_producto: null, cantidad: "", precio_unitario: "" }],
  });

  useEffect(() => {
    Promise.all([
      axios.get(API_CLIENTES),
      axios.get(API_PRODUCTOS),
      axios.get(API_FORMAS),
    ]).then(([resCli, resProd, resForma]) => {
      setClientes(
        resCli.data.map((c) => ({
          value: c.id_cliente,
          label: `${c.nombre} ${c.apellido}`,
        }))
      );
      setProductos(
        resProd.data.map((p) => ({
          value: p.id_producto,
          label: p.nombre_producto,
          precio: p.precio_venta,
        }))
      );
      setFormasPago(resForma.data);
    });
  }, []);

  const handleProductoChange = (index, field, value) => {
    const nuevos = [...formVenta.productos];
    nuevos[index][field] = value;
    setFormVenta({ ...formVenta, productos: nuevos });
  };

  const agregarProducto = () => {
    setFormVenta({
      ...formVenta,
      productos: [...formVenta.productos, { id_producto: null, cantidad: "", precio_unitario: "" }],
    });
  };

  const calcularTotal = () => {
    const subtotal = formVenta.productos.reduce((t, p) => {
      return t + (parseFloat(p.cantidad || 0) * parseFloat(p.precio_unitario || 0));
    }, 0);
    const iva = subtotal * 0.19;
    return { subtotal, iva, total: subtotal + iva };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const payload = {
        id_cliente: formVenta.id_cliente?.value || 0,
        id_forma_pago: Number(formVenta.id_forma_pago),
        id_usuario: 1,
        productos: formVenta.productos.map((p) => ({
          id_producto: p.id_producto?.value || 0,
          cantidad: Number(p.cantidad),
          precio_unitario: Number(p.precio_unitario),
        })),
      };

      const res = await registrarVenta(payload);
      setMensaje(res.mensaje || "Venta registrada correctamente");
      setTipoMsg("success");
      setFormVenta({
        id_cliente: null,
        id_forma_pago: "",
        productos: [{ id_producto: null, cantidad: "", precio_unitario: "" }],
      });
    } catch (error) {
      console.error(error);
      setMensaje("Error al registrar la venta");
      setTipoMsg("danger");
    } finally {
      setCargando(false);
    }
  };

  const { subtotal, iva, total } = calcularTotal();

  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#212529",
      borderColor: "#dc3545",
      color: "white",
    }),
    singleValue: (base) => ({ ...base, color: "white" }),
    menu: (base) => ({ ...base, backgroundColor: "#212529" }),
  };

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">Registro de Ventas</h2>
        {mensaje && (
          <Alert variant={tipoMsg} className="text-center fw-bold">
            {mensaje}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Label>Cliente</Form.Label>
              <Select
                styles={selectStyles}
                value={formVenta.id_cliente}
                onChange={(opt) => setFormVenta({ ...formVenta, id_cliente: opt })}
                options={clientes}
                placeholder="Buscar cliente..."
                isClearable
              />
            </Col>

            <Col md={6}>
              <Form.Label>Forma de Pago</Form.Label>
              <Form.Select
                className="bg-dark text-white border-danger"
                name="id_forma_pago"
                value={formVenta.id_forma_pago}
                onChange={(e) => setFormVenta({ ...formVenta, id_forma_pago: e.target.value })}
                required
              >
                <option value="">Seleccione</option>
                {formasPago.map((f) => (
                  <option key={f.id_forma_pago} value={f.id_forma_pago}>
                    {f.nombre_forma}
                  </option>
                ))}
              </Form.Select>
            </Col>

            {formVenta.productos.map((prod, index) => (
              <Row key={index} className="g-2 mt-2">
                <Col md={6}>
                  <Form.Label>Producto {index + 1}</Form.Label>
                  <Select
                    styles={selectStyles}
                    value={prod.id_producto}
                    onChange={(opt) => handleProductoChange(index, "id_producto", opt)}
                    options={productos}
                    placeholder="Buscar producto..."
                    isClearable
                  />
                </Col>

                <Col md={3}>
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    type="number"
                    className="bg-dark text-white border-danger"
                    value={prod.cantidad}
                    onChange={(e) => handleProductoChange(index, "cantidad", e.target.value)}
                  />
                </Col>

                <Col md={3}>
                  <Form.Label>Precio Unitario</Form.Label>
                  <Form.Control
                    type="number"
                    className="bg-dark text-white border-danger"
                    value={prod.precio_unitario}
                    onChange={(e) => handleProductoChange(index, "precio_unitario", e.target.value)}
                  />
                </Col>
              </Row>
            ))}

            <Col md={12} className="text-end mt-3">
              <Button variant="outline-danger" onClick={agregarProducto}>
                + Agregar otro producto
              </Button>
            </Col>

            <Col md={12} className="text-end mt-3">
              <h5>
                Subtotal: <span className="text-warning">${subtotal.toLocaleString()}</span> <br />
                IVA (19%): <span className="text-warning">${iva.toLocaleString()}</span> <br />
                Total: <span className="text-success">${total.toLocaleString()}</span>
              </h5>
            </Col>

            <Col md={12} className="text-center mt-3">
              <Button variant="danger" type="submit" className="fw-bold px-4" disabled={cargando}>
                {cargando ? <Spinner animation="border" size="sm" /> : "Registrar Venta"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}
