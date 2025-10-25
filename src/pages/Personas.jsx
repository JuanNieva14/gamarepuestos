import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Spinner,
  Alert,
  Card,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";

export default function Personas() {
  const [personas, setPersonas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);

  const porPagina = 10;

  useEffect(() => {
    axios
      .get("http://localhost:8001/personas")
      .then((res) => {
        // ✅ Ordenar de menor a mayor por ID
        const ordenadas = res.data.sort(
          (a, b) => a.id_persona - b.id_persona
        );
        setPersonas(ordenadas);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setError("❌ Error al cargar las personas");
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  // 🔍 Filtrado por búsqueda (nombre, apellido, correo, documento)
  const personasFiltradas = personas.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.numero_documento.toString().includes(busqueda)
  );

  // 🔢 Paginación
  const totalPaginas = Math.ceil(personasFiltradas.length / porPagina) || 1;
  const inicio = (pagina - 1) * porPagina;
  const datosPagina = personasFiltradas.slice(inicio, inicio + porPagina);

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Listado de Personas</h2>

        {/* 🔍 Barra de búsqueda */}
        <InputGroup className="mb-4">
          <Form.Control
            placeholder="Buscar por nombre, apellido, correo o número de documento..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPagina(1);
            }}
          />
          <Button variant="outline-danger" onClick={() => setBusqueda("")}>
            ✖ Limpiar
          </Button>
        </InputGroup>

        <Table striped bordered hover variant="dark" responsive className="text-center align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Número Documento</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Fecha de creación</th>
            </tr>
          </thead>
          <tbody>
            {datosPagina.length > 0 ? (
              datosPagina.map((p) => (
                <tr key={p.id_persona}>
                  <td>{p.id_persona}</td>
                  <td>{p.numero_documento}</td>
                  <td>{p.nombre}</td>
                  <td>{p.apellido}</td>
                  <td>{p.correo}</td>
                  <td>{p.direccion}</td>
                  <td>{p.fecha_creacion}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* 🔢 Controles de paginación */}
        {personasFiltradas.length > porPagina && (
          <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
            <Button
              variant="outline-light"
              size="sm"
              disabled={pagina === 1}
              onClick={() => setPagina(pagina - 1)}
            >
              ⬅️
            </Button>
            <span>
              Página {pagina} de {totalPaginas}
            </span>
            <Button
              variant="outline-light"
              size="sm"
              disabled={pagina === totalPaginas}
              onClick={() => setPagina(pagina + 1)}
            >
              ➡️
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}
