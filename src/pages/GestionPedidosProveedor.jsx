import React, { useEffect, useState } from "react";
import { Container, Card, Table, Form, Row, Col, Button, Spinner, Badge } from "react-bootstrap";
import { getPedidos, getSelectProveedores, getSelectVendedores, getSelectEstados, crearPedido } from "../services/gestion_pedidos_proveedoresService";

export default function GestionPedidosProveedores() {
  const [pedidos, setPedidos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [estados, setEstados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [nuevoPedido, setNuevoPedido] = useState({
    id_proveedor: "",
    id_usuario: "",
    id_producto: "",
    fecha_entrega: "",
    id_estado: "",
    total: "",
    observacion: "",
  });

  useEffect(() => {
    const cargarDatos = async () => {
      const [resPedidos, resProv, resVend, resEst] = await Promise.all([
        getPedidos(),
        getSelectProveedores(),
        getSelectVendedores(),
        getSelectEstados(),
      ]);

      if (resPedidos.success) setPedidos(resPedidos.data);
      if (resProv.success) setProveedores(resProv.data);
      if (resVend.success) setVendedores(resVend.data);
      if (resEst.success) setEstados(resEst.data);

      setCargando(false);
    };
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    setNuevoPedido({ ...nuevoPedido, [e.target.name]: e.target.value });
  };

  const handleCrear = async () => {
    const res = await crearPedido(nuevoPedido);
    if (res.success) {
      alert("✅ Pedido creado correctamente");
      const refetch = await getPedidos();
      setPedidos(refetch.data);
    } else {
      alert("❌ " + res.error);
    }
  };

  const pedidosFiltrados = pedidos.filter(
    (p) =>
      p.proveedor?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.vendedor?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Gestión de Pedidos a Proveedores</h2>

        {/* 🔍 Buscador */}
        <Row className="mb-4">
          <Col md={5}>
            <Form.Control
              placeholder="Buscar por proveedor o vendedor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Col>
        </Row>

        {/* 🧾 Nuevo Pedido */}
        <Row className="g-3 mb-4">
          <Col md={3}>
            <Form.Select name="id_proveedor" value={nuevoPedido.id_proveedor} onChange={handleChange}>
              <option value="">Seleccionar Proveedor</option>
              {proveedores.map((p) => (
                <option key={p.id_proveedor} value={p.id_proveedor}>
                  {p.nombre}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Select name="id_usuario" value={nuevoPedido.id_usuario} onChange={handleChange}>
              <option value="">Seleccionar Vendedor</option>
              {vendedores.map((v) => (
                <option key={v.id_usuario} value={v.id_usuario}>
                  {v.nombre}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Control
              type="date"
              name="fecha_entrega"
              value={nuevoPedido.fecha_entrega}
              onChange={handleChange}
            />
          </Col>

          <Col md={2}>
            <Form.Select name="id_estado" value={nuevoPedido.id_estado} onChange={handleChange}>
              <option value="">Estado</option>
              {estados.map((e) => (
                <option key={e.id_estado} value={e.id_estado}>
                  {e.nombre_estado}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Control
              type="number"
              placeholder="Total (COP)"
              name="total"
              value={nuevoPedido.total}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row>
          <Col md={10}>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Observaciones del pedido..."
              name="observacion"
              value={nuevoPedido.observacion}
              onChange={handleChange}
            />
          </Col>
          <Col md={2}>
            <Button variant="danger" className="w-100 h-100" onClick={handleCrear}>
              ➕ Crear Pedido
            </Button>
          </Col>
        </Row>

        {/* 🧮 Tabla */}
        {cargando ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <Table striped bordered hover variant="dark" responsive className="text-center mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Proveedor</th>
                <th>Vendedor</th>
                <th>Producto</th>
                <th>Estado</th>
                <th>Fecha Pedido</th>
                <th>Entrega</th>
                <th>Total</th>
                <th>Observación</th>
              </tr>
            </thead>
            <tbody>
              {pedidosFiltrados.map((p) => (
                <tr key={p.id_pedido}>
                  <td>{p.id_pedido}</td>
                  <td>{p.proveedor}</td>
                  <td>{p.vendedor}</td>
                  <td>{p.producto}</td>
                  <td><Badge bg="info">{p.estado}</Badge></td>
                  <td>{p.fecha_pedido}</td>
                  <td>{p.fecha_entrega}</td>
                  <td>${Number(p.total).toLocaleString()}</td>
                  <td>{p.observacion}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
}
