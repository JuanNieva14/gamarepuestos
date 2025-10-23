import React, { useState } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Badge,
} from "react-bootstrap";

export default function Inventario() {
  // 🧾 Datos simulados basados en tu tabla real
  const [inventario, setInventario] = useState([
    { id_inventario: 1, id_producto: 1, stock_actual: 34, stock_minimo: 8, fecha_actualizacion: "2023-06-03 00:01:27" },
    { id_inventario: 2, id_producto: 2, stock_actual: 32, stock_minimo: 10, fecha_actualizacion: "2024-12-17 15:22:27" },
    { id_inventario: 3, id_producto: 3, stock_actual: 98, stock_minimo: 5, fecha_actualizacion: "2025-07-03 21:13:56" },
    { id_inventario: 4, id_producto: 4, stock_actual: 98, stock_minimo: 5, fecha_actualizacion: "2025-03-19 01:13:39" },
    { id_inventario: 5, id_producto: 5, stock_actual: 43, stock_minimo: 5, fecha_actualizacion: "2024-05-01 23:32:44" },
  ]);

  const [mensaje, setMensaje] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [nuevoStock, setNuevoStock] = useState("");

  // 💬 Mostrar mensaje
  const showMsg = (texto, ms = 2500) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(null), ms);
  };

  // 🟡 Determinar color del stock
  const getBadgeColor = (stock, minimo) => {
    if (stock === 0) return "danger";
    if (stock <= minimo) return "warning";
    return "success";
  };

  // ✏️ Abrir modal
  const handleEditarStock = (registro) => {
    setRegistroSeleccionado(registro);
    setNuevoStock(registro.stock_actual);
    setMostrarModal(true);
  };

  // 💾 Actualizar stock
  const handleActualizar = () => {
    if (nuevoStock === "" || isNaN(nuevoStock) || nuevoStock < 0) {
      showMsg("❌ Ingrese un valor válido de stock.");
      return;
    }

    const actualizado = inventario.map((r) =>
      r.id_inventario === registroSeleccionado.id_inventario
        ? {
            ...r,
            stock_actual: parseInt(nuevoStock),
            fecha_actualizacion: new Date()
              .toISOString()
              .replace("T", " ")
              .slice(0, 19),
          }
        : r
    );

    setInventario(actualizado);
    setMostrarModal(false);
    showMsg("✅ Stock actualizado correctamente.");
  };

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">Inventario General</h2>

        {/* Mensaje */}
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

        {/* Tabla de inventario */}
        <Table striped bordered hover variant="dark" className="text-center align-middle">
          <thead>
            <tr>
              <th>ID Inventario</th>
              <th>ID Producto</th>
              <th>Stock Actual</th>
              <th>Stock Mínimo</th>
              <th>Fecha de Actualización</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inventario.length === 0 ? (
              <tr>
                <td colSpan={7}>No hay registros de inventario.</td>
              </tr>
            ) : (
              inventario.map((r) => (
                <tr key={r.id_inventario}>
                  <td>{r.id_inventario}</td>
                  <td>{r.id_producto}</td>
                  <td>
                    <Badge bg={getBadgeColor(r.stock_actual, r.stock_minimo)}>
                      {r.stock_actual}
                    </Badge>
                    {r.stock_actual <= r.stock_minimo && (
                      <span className="text-warning ms-2">⚠ Bajo stock</span>
                    )}
                  </td>
                  <td>{r.stock_minimo}</td>
                  <td>{r.fecha_actualizacion}</td>
                  <td>
                    {r.stock_actual === 0 ? (
                      <Badge bg="danger">Agotado</Badge>
                    ) : r.stock_actual <= r.stock_minimo ? (
                      <Badge bg="warning">En Pedido</Badge>
                    ) : (
                      <Badge bg="success">Activo</Badge>
                    )}
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-warning"
                      onClick={() => handleEditarStock(r)}
                    >
                      ✏️ Actualizar Stock
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      {/* 🟡 Modal de actualización */}
      <Modal
        show={mostrarModal}
        onHide={() => setMostrarModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>Actualizar Stock</Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-dark text-light">
          {registroSeleccionado && (
            <>
              <p>
                <strong>ID Producto:</strong> {registroSeleccionado.id_producto}
              </p>
              <Form.Group>
                <Form.Label>Nuevo valor de stock</Form.Label>
                <Form.Control
                  type="number"
                  value={nuevoStock}
                  onChange={(e) => setNuevoStock(e.target.value)}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>

        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleActualizar}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
