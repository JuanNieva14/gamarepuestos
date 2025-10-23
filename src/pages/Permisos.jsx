import React, { useState } from "react";
import { Container, Card, Table, Form, Button, Badge } from "react-bootstrap";

export default function Permisos() {
  // Datos iniciales: roles y permisos básicos
  const [permisos, setPermisos] = useState([
    {
      rol: "Administrador",
      modulos: {
        Productos: { ver: true, editar: true, eliminar: true },
        Ventas: { ver: true, editar: true, eliminar: true },
        Reportes: { ver: true, editar: true, eliminar: true },
        Usuarios: { ver: true, editar: true, eliminar: true },
      },
    },
    {
      rol: "Vendedor",
      modulos: {
        Productos: { ver: true, editar: false, eliminar: false },
        Ventas: { ver: true, editar: true, eliminar: false },
        Reportes: { ver: true, editar: false, eliminar: false },
        Usuarios: { ver: false, editar: false, eliminar: false },
      },
    },
    {
      rol: "Auxiliar",
      modulos: {
        Productos: { ver: true, editar: false, eliminar: false },
        Ventas: { ver: false, editar: false, eliminar: false },
        Reportes: { ver: true, editar: false, eliminar: false },
        Usuarios: { ver: false, editar: false, eliminar: false },
      },
    },
  ]);

  // Cambiar permisos
  const togglePermiso = (rolIndex, modulo, accion) => {
    const nuevosPermisos = [...permisos];
    nuevosPermisos[rolIndex].modulos[modulo][accion] =
      !nuevosPermisos[rolIndex].modulos[modulo][accion];
    setPermisos(nuevosPermisos);
  };

  // Guardar cambios (simulado)
  const handleGuardar = () => {
    alert("✅ Permisos actualizados correctamente.");
    console.log(permisos);
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Permisos por Rol</h2>

        {permisos.map((p, rolIndex) => (
          <Card
            key={p.rol}
            className="mb-4 p-3 bg-secondary text-light border-0 shadow-sm"
          >
            <h4 className="mb-3">
              <Badge bg="danger" className="me-2">
                {p.rol}
              </Badge>
              <small className="text-light opacity-75">Gestión de permisos</small>
            </h4>

            <Table striped bordered hover variant="dark" responsive>
              <thead>
                <tr>
                  <th>Módulo</th>
                  <th>Ver</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(p.modulos).map(([modulo, acciones]) => (
                  <tr key={modulo}>
                    <td>{modulo}</td>
                    {Object.entries(acciones).map(([accion, valor]) => (
                      <td key={accion} className="text-center">
                        <Form.Check
                          type="checkbox"
                          checked={valor}
                          onChange={() => togglePermiso(rolIndex, modulo, accion)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        ))}

        <div className="text-center mt-3">
          <Button variant="danger" size="lg" onClick={handleGuardar}>
            Guardar Cambios
          </Button>
        </div>
      </Card>
    </Container>
  );
}
