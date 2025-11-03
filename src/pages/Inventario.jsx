import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Badge,
  Spinner,
  Card,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  PencilFill,
  ArrowLeftSquareFill,
  ArrowRightSquareFill,
  Search,
} from "react-bootstrap-icons";
import { obtenerInventario, actualizarStock } from "../services/inventario";

export default function Inventario() {
  const [inventario, setInventario] = useState([]);
  const [filtrado, setFiltrado] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevoStock, setNuevoStock] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10;

  useEffect(() => {
    cargarInventario();
  }, []);

  useEffect(() => {
    if (busqueda.length >= 3) {
      const texto = busqueda.toLowerCase();
      const resultados = inventario.filter(
        (p) =>
          p.Codigo.toLowerCase().includes(texto) ||
          p.Producto.toLowerCase().includes(texto)
      );
      setFiltrado(resultados);
      setPaginaActual(1);
    } else {
      setFiltrado(inventario);
    }
  }, [busqueda, inventario]);

  const cargarInventario = async () => {
    setCargando(true);
    try {
      const data = await obtenerInventario();
      setInventario(data);
      setFiltrado(data);
    } catch (error) {
      console.error("Error al obtener inventario:", error);
    } finally {
      setCargando(false);
    }
  };

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setNuevoStock(producto.Stock_Actual);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProductoSeleccionado(null);
    setNuevoStock("");
  };

  const guardarCambios = async () => {
    try {
      await actualizarStock(productoSeleccionado.Codigo, nuevoStock);
      cerrarModal();
      cargarInventario();
    } catch (error) {
      alert("Error al actualizar el stock");
    }
  };

  // Paginación
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const indiceFin = indiceInicio + productosPorPagina;
  const productosPagina = filtrado.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(filtrado.length / productosPorPagina);

  const siguientePagina = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  return (
    <Card className="p-4 shadow-lg bg-dark text-white">
      <h2 className="text-center text-danger mb-4">Inventario General</h2>

      {/* Barra de búsqueda */}
      <div className="mb-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <InputGroup>
          <InputGroup.Text className="bg-danger border-danger text-white">
            <Search />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Buscar por código o nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="bg-dark text-white border-danger"
          />
        </InputGroup>
        {busqueda.length > 0 && busqueda.length < 3 && (
          <small className="text-secondary">
            Escribe al menos 3 letras para buscar...
          </small>
        )}
      </div>

      {cargando ? (
        <div className="text-center">
          <Spinner animation="border" variant="light" />
          <p className="mt-2">Cargando inventario...</p>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <Table striped bordered hover variant="dark" className="align-middle text-center">
              <thead style={{ backgroundColor: "#5c0a0a", color: "#fff" }}>
                <tr>
                  <th>ID</th>
                  <th>Código</th>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio Venta</th>
                  <th>Stock Actual</th>
                  <th>Stock Mínimo</th>
                  <th>Fecha Actualización</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosPagina.length > 0 ? (
                  productosPagina.map((item, index) => {
                    const estado =
                      item.Stock_Actual <= item.Stock_Minimo ? (
                        <Badge bg="danger">Crítico</Badge>
                      ) : (
                        <Badge bg="success">Activo</Badge>
                      );

                    return (
                      <tr key={index}>
                        <td>{indiceInicio + index + 1}</td>
                        <td>{item.Codigo}</td>
                        <td>{item.Producto}</td>
                        <td>{item.Categoria}</td>
                        <td>${item.Precio_Venta.toLocaleString("es-CO")}</td>
                        <td>
                          <Badge
                            bg={
                              item.Stock_Actual <= item.Stock_Minimo
                                ? "danger"
                                : "success"
                            }
                          >
                            {item.Stock_Actual}
                          </Badge>
                        </td>
                        <td>{item.Stock_Minimo}</td>
                        <td>
                          {new Date(item.Fecha_Actualizacion).toLocaleString("es-CO")}
                        </td>
                        <td>{estado}</td>
                        <td>
                          <Button
                            variant="outline-warning"
                            size="sm"
                            className="fw-bold d-flex align-items-center gap-1 mx-auto"
                            style={{
                              borderColor: "#ffc107",
                              color: "#ffff66",
                              fontWeight: "bold",
                            }}
                            onClick={() => abrirModal(item)}
                          >
                            <PencilFill style={{ color: "#ff6600" }} />
                            Editar
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center text-muted">
                      No se encontraron resultados
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* Navegación profesional */}
          {filtrado.length > 10 && (
            <div
              className="d-flex justify-content-between align-items-center mt-3"
              style={{ width: "100%" }}
            >
              <Button
                variant="outline-light"
                size="sm"
                onClick={paginaAnterior}
                disabled={paginaActual === 1}
              >
                <ArrowLeftSquareFill size={22} color="#007bff" />
              </Button>

              <span
                className="text-center"
                style={{ flex: 1, fontWeight: "bold" }}
              >
                Sesión {paginaActual} de {totalPaginas}
              </span>

              <Button
                variant="outline-light"
                size="sm"
                onClick={siguientePagina}
                disabled={paginaActual === totalPaginas}
              >
                <ArrowRightSquareFill size={22} color="#007bff" />
              </Button>
            </div>
          )}
        </>
      )}

      {/* Modal de actualización */}
      <Modal show={mostrarModal} onHide={cerrarModal} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Actualizar Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          {productoSeleccionado && (
            <>
              <p>
                <strong>Producto:</strong> {productoSeleccionado.Producto}
              </p>
              <p>
                <strong>Categoría:</strong> {productoSeleccionado.Categoria}
              </p>
              <Form.Group>
                <Form.Label>Nuevo Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={nuevoStock}
                  onChange={(e) => setNuevoStock(e.target.value)}
                  min="0"
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark text-white">
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="warning" onClick={guardarCambios}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
