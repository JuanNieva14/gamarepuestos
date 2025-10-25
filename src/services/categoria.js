import React, { useState, useEffect } from "react";
import { Table, Button, Form, Card, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import "./Categoria.css";

export default function Categoria() {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ nombre: "", descripcion: "" });
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  const API_URL = "http://localhost:8001/categorias";

  const listar = async () => {
    const res = await axios.get(API_URL);
    setCategorias(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      await axios.post(API_URL, form);
      setMensaje({ tipo: "success", texto: "Categoría agregada exitosamente" });
      listar();
      setForm({ nombre: "", descripcion: "" });
    } catch (err) {
      setMensaje({ tipo: "danger", texto: "Error al guardar la categoría" });
    } finally {
      setCargando(false);
    }
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta categoría?")) {
      await axios.delete(`${API_URL}/${id}`);
      listar();
    }
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <div className="categoria-container">
      <Card className="p-4 shadow">
        <h3 className="text-center text-danger mb-4">Gestión de Categorías</h3>

        {mensaje && <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>}

        <Form onSubmit={handleSubmit} className="mb-4">
          <div className="d-flex gap-2">
            <Form.Control
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre de la categoría"
              required
            />
            <Form.Control
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Descripción"
            />
            <Button variant="danger" type="submit" disabled={cargando}>
              {cargando ? <Spinner size="sm" animation="border" /> : "Agregar"}
            </Button>
          </div>
        </Form>

        <Table bordered hover responsive>
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {categorias.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.nombre}</td>
                <td>{cat.descripcion}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => eliminar(cat.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
