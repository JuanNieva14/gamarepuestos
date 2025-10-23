import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Spinner, Alert, Card } from "react-bootstrap";

export default function Personas() {
  const [personas, setPersonas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8001/personas") // 👈 tu backend FastAPI
      .then((res) => {
        setPersonas(res.data);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error al cargar las personas");
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

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Listado de Personas</h2>
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Número Documento</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {personas.length > 0 ? (
              personas.map((p) => (
                <tr key={p.id_persona}>
                  <td>{p.id_persona}</td>
                  <td>{p.numero_documento}</td>
                  <td>{p.nombre}</td>
                  <td>{p.apellido}</td>
                  <td>{p.correo}</td>
                  <td>{p.direccion}</td>
                  <td>{p.estado}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No hay personas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
