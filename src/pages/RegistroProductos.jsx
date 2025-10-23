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

export default function RegistroProductos() {
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: "Aceite 20W50",
      tipo: "Lubricante",
      categoria: "Motor",
      precio: 25000,
      proveedor: "Lubricantes Colmoto",
      fecha_ingreso: "2025-09-30",
      estado: "Activo",
      imagen: null,
    },
  ]);

  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    categoria: "",
    precio: "",
    proveedor: "",
    fecha_ingreso: "",
    estado: "Activo",
    imagen: null,
  });

  const [preview, setPreview] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  // 💬 Mostrar mensajes
  const showMsg = (texto, ms = 2500) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(null), ms);
  };

  // 🔄 Manejo de inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      const file = files[0];
      setFormData({ ...formData, imagen: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 💾 Registrar producto
  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, tipo, categoria, precio, proveedor, fecha_ingreso } =
      formData;

    if (
      !nombre ||
      !tipo ||
      !categoria ||
      !precio ||
      !proveedor ||
      !fecha_ingreso
    ) {
      showMsg("❌ Todos los campos son obligatorios.");
      return;
    }

    const nuevo = {
      id: Date.now(),
      ...formData,
    };

    // Agrega el nuevo producto al inicio y limita la lista a los 10 más recientes
    const actualizados = [nuevo, ...productos].slice(0, 10);

    setProductos(actualizados);
    showMsg("✅ Producto registrado correctamente.");

    setFormData({
      nombre: "",
      tipo: "",
      categoria: "",
      precio: "",
      proveedor: "",
      fecha_ingreso: "",
      estado: "Activo",
      imagen: null,
    });
    setPreview(null);
  };

  // 🗑️ Eliminar producto
  const handleDelete = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
    showMsg("🗑️ Producto eliminado correctamente.");
  };

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-lg bg-dark text-light border-0">
        <h2 className="text-center text-danger mb-4">Registro de Productos</h2>

        {/* 🔔 Mensajes */}
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

        {/* 🧾 Formulario */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Pastillas de freno"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
            >
              <option value="">Seleccione un tipo</option>
              <option value="Repuesto">Repuesto</option>
              <option value="Accesorio">Accesorio</option>
              <option value="Lubricante">Lubricante</option>
              <option value="Eléctrico">Eléctrico</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            >
              <option value="">Seleccione una categoría</option>
              <option value="Motor">Motor</option>
              <option value="Frenos">Frenos</option>
              <option value="Transmisión">Transmisión</option>
              <option value="Suspensión">Suspensión</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio (COP)</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              placeholder="Ej: 25000"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Proveedor</Form.Label>
            <Form.Control
              type="text"
              name="proveedor"
              value={formData.proveedor}
              onChange={handleChange}
              placeholder="Ej: Repuestos del Norte S.A.S"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de Ingreso</Form.Label>
            <Form.Control
              type="date"
              name="fecha_ingreso"
              value={formData.fecha_ingreso}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
            >
              <option value="Activo">Activo</option>
              <option value="Agotado">Agotado</option>
              <option value="En Pedido">En Pedido</option>
            </Form.Select>
          </Form.Group>

          {/* 🖼️ Carga de imagen */}
          <Form.Group className="mb-3">
            <Form.Label>Imagen del producto</Form.Label>
            <Form.Control
              type="file"
              name="imagen"
              accept="image/*"
              onChange={handleChange}
            />
          </Form.Group>

          {preview && (
            <div className="text-center mb-3">
              <img
                src={preview}
                alt="Vista previa"
                className="rounded shadow"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
            </div>
          )}

          <div className="text-center">
            <Button variant="danger" type="submit" className="px-5">
              ➕ Registrar Producto
            </Button>
          </div>
        </Form>
      </Card>

      {/* 📋 Tabla de productos recientes */}
      <Card className="p-4 mt-4 shadow bg-dark text-light border-0">
        <h4 className="text-center text-danger mb-3">
          Últimos 10 Productos Registrados
        </h4>
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
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Proveedor</th>
              <th>Fecha Ingreso</th>
              <th>Estado</th>
              <th>Imagen</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr>
                <td colSpan={10}>No hay productos registrados.</td>
              </tr>
            ) : (
              productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.tipo}</td>
                  <td>{p.categoria}</td>
                  <td>${p.precio.toLocaleString()}</td>
                  <td>{p.proveedor}</td>
                  <td>{p.fecha_ingreso}</td>
                  <td>
                    <Badge
                      bg={
                        p.estado === "Activo"
                          ? "success"
                          : p.estado === "Agotado"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {p.estado}
                    </Badge>
                  </td>
                  <td>
                    {p.imagen ? (
                      <img
                        src={
                          typeof p.imagen === "string"
                            ? p.imagen
                            : URL.createObjectURL(p.imagen)
                        }
                        alt={p.nombre}
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "5px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "Sin imagen"
                    )}
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDelete(p.id)}
                    >
                      🗑️ Eliminar
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
