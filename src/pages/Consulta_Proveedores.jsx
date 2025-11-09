import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Table,
  Form,
  Row,
  Col,
  Spinner,
  Button,
} from "react-bootstrap";
import { obtenerProveedores } from "../services/consulta_proveedores";

export default function ConsultaProveedores() {
  const [busqueda, setBusqueda] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  // 🔄 Cargar lista de proveedores
  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        const data = await obtenerProveedores();
        setProveedores(data);
      } catch (error) {
        alert("Error al cargar proveedores: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  // 🔍 Filtro en vivo
  const proveedoresFiltrados = proveedores.filter((p) => {
    const texto = `
      ${p.nit ?? ""}
      ${p.nombre_completo ?? ""}
      ${p.tipo_documento ?? ""}
      ${p.numero_documento ?? ""}
      ${p.correo ?? ""}
      ${p.direccion ?? ""}
      ${p.ciudad ?? ""}
    `.toLowerCase();
    return texto.includes(busqueda.toLowerCase());
  });

  // 📄 Paginación automática (solo si hay más de 10 registros)
  const totalPaginas = Math.ceil(proveedoresFiltrados.length / pageSize);
  const mostrarPaginacion = proveedoresFiltrados.length > pageSize;
  const inicio = (page - 1) * pageSize;
  const fin = inicio + pageSize;
  const proveedoresPaginados = mostrarPaginacion
    ? proveedoresFiltrados.slice(inicio, fin)
    : proveedoresFiltrados;

  const handlePageChange = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPage(nuevaPagina);
    }
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">
          Lista General de Proveedores
        </h2>

        {/* 🔍 Búsqueda */}
        <Row className="mb-3">
          <Col md={{ span: 6, offset: 3 }}>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre, documento, NIT o ciudad..."
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPage(1); // reiniciar paginación al buscar
              }}
            />
          </Col>
        </Row>

        {/* 📋 Tabla */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <>
            <Table
              striped
              bordered
              hover
              variant="dark"
              responsive
              className="text-center align-middle"
            >
              <thead>
                <tr>
                  <th>NIT</th>
                  <th>Nombre Completo</th>
                  <th>Tipo Documento</th>
                  <th>Documento</th>
                  <th>Correo</th>
                  <th>Dirección</th>
                  <th>Ciudad</th>
                </tr>
              </thead>
              <tbody>
                {proveedoresPaginados.length > 0 ? (
                  proveedoresPaginados.map((p) => (
                    <tr key={p.id_proveedor}>
                      <td>{p.nit}</td>
                      <td>{p.nombre_completo}</td>
                      <td>{p.tipo_documento}</td>
                      <td>{p.numero_documento}</td>
                      <td>{p.correo}</td>
                      <td>{p.direccion}</td>
                      <td>{p.ciudad || "Sin ciudad"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No se encontraron proveedores.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* 🔽 Paginación */}
            {mostrarPaginacion && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  ⏪ Anterior
                </Button>

                <span className="text-light">
                  Página <strong>{page}</strong> de{" "}
                  <strong>{totalPaginas}</strong>
                </span>

                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPaginas}
                >
                  Siguiente ⏩
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </Container>
  );
}
