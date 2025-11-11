import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Dropdown } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons";
import "./NavbarApp.css";

export default function NavbarApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUsuario(parsed);
        setRol(parsed.rol?.toUpperCase());
      } catch {
        console.error("Error al parsear usuario guardado.");
      }
    }
  }, []);

  const handleNavigation = (path) => navigate(path);
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar
      expand="lg"
      className="navbar-dark-custom shadow-sm border-bottom border-danger"
      variant="dark"
    >
      <Container>
        {/* Marca */}
        <Navbar.Brand
          onClick={() => handleNavigation("/inicio")}
          style={{ cursor: "pointer" }}
          className="fw-bold text-white"
        >
                 
       <img src="/imagenes/logo192x192.png" 
       width={50}
       />

      
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto align-items-center nav-animated">
            {/* INICIO */}
            <Nav.Link
              onClick={() => handleNavigation("/inicio")}
              className={isActive("/inicio") ? "active" : ""}
            >
              Inicio
            </Nav.Link>

            {/* BÁSICO */}
            <NavDropdown
              title="Básico"
              id="basic-nav-dropdown"
              className={
                location.pathname.startsWith("/categorias") ||
                location.pathname.startsWith("/danos")
                  ? "active"
                  : ""
              }
            >
              <NavDropdown.Item onClick={() => handleNavigation("/categorias")}>
                Categorías
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/danos")}>
                Repuestos dañados
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/personas")}>
                Personas
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/formaspago")}>
                Forma de pago
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/estados")}>
                Estados
              </NavDropdown.Item>
            </NavDropdown>

            {/* GESTIÓN */}
            <NavDropdown title="Gestión" id="gestion-nav-dropdown">
              <NavDropdown.Item onClick={() => handleNavigation("/gestionpedidosproveedor")}>
                Pedidos a proveedores
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/inventario")}>
                Inventario
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/creaccionproveedores")}>
                Creación de proveedores
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/registroproductos")}>
                Registro de productos
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/ventaproductos")}>
                Venta de productos
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/actualizarstock")}>
                Actualizar stock
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/crearcotizacion")}>
                Crear cotización
              </NavDropdown.Item>
            </NavDropdown>

            {/* CONSULTAS */}
            <NavDropdown title="Consultas" id="consultas-nav-dropdown">
              <NavDropdown.Item onClick={() => handleNavigation("/productos")}>Productos</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/clientes")}>Clientes</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/proveedores")}>Proveedores</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/cotizacionesrealizadas")}>
                Cotizaciones realizadas
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/facturasemitidas")}>
                Facturas emitidas
              </NavDropdown.Item>
            </NavDropdown>

            {/* AYUDA */}
            <NavDropdown title="Ayuda" id="ayuda-nav-dropdown">
              <NavDropdown.Item onClick={() => handleNavigation("/manualusuario")}>
                Manual de usuario
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/tutoriales")}>
                Tutoriales
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/acerca")}>
                Acerca del sistema
              </NavDropdown.Item>
            </NavDropdown>

            {/* ADMINISTRACIÓN + (ENLACE DIRECTO) */}
            <Nav.Link
              onClick={() => handleNavigation("/admin")}
              className={`admin-plus-link ${isActive("/admin") ? "active" : ""}`}
            >
              Administración +
            </Nav.Link>
          </Nav>

          {/* PERFIL DEL USUARIO */}
          <Nav className="ms-auto">
            {usuario ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="outline"
                  className="d-flex align-items-center fw-semibold text-white custom-toggle"
                  id="dropdown-usuario"
                >
                  <PersonCircle className="me-2 fs-5" />
                  {usuario.usuario || "Usuario"}
                </Dropdown.Toggle>

                <Dropdown.Menu className="user-menu p-3">
                  <div className="text-center">
                    <div className="fw-bold fs-5">
                      {usuario.nombre} {usuario.apellido}
                    </div>
                    <div className="text-secondary small">{usuario.correo}</div>
                    <div className="text-secondary small mb-2">
                      Documento: {usuario.numero_documento || "N/A"}
                    </div>
                    <div
                      className={`role-badge ${
                        usuario.rol?.toUpperCase() === "ADMINISTRADOR" ? "admin" : "vendedor"
                      }`}
                    >
                      {usuario.rol?.charAt(0).toUpperCase() + usuario.rol?.slice(1).toLowerCase()}
                    </div>
                  </div>

                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={handleLogout}
                    className="text-center logout-btn text-danger fw-bold"
                  >
                    Cerrar sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link onClick={() => handleNavigation("/login")}>Iniciar sesión</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
