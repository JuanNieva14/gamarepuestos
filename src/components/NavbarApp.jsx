import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NavbarApp() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand onClick={() => handleNavigation("/")} style={{ cursor: "pointer" }}>
          Gama Repuestos Quibdó
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">

            {/* INICIO */}
            <Nav.Link onClick={() => handleNavigation("/")}>Inicio</Nav.Link>

            {/* BÁSICO */}
            <NavDropdown title="Básico" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => handleNavigation("/categorias")}>
                Categoría de respuesta
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/tipos")}>
                Tipos de respuestas
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/personas")}>
                Personas
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/formas-pago")}>
                Forma de pago
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/estados")}>
                Estados
              </NavDropdown.Item>
            </NavDropdown>

            {/* GESTIÓN */}
            <NavDropdown title="Gestión" id="gestion-nav-dropdown">
              <NavDropdown.Item onClick={() => handleNavigation("/pedidos")}>
                Pedidos a proveedores
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/inventario")}>
                Inventario
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/registro-productos")}>
                Registro de productos
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/venta-productos")}>
                Venta de productos
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/actualizar-stock")}>
                Actualizar stock
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleNavigation("/crear-cotizacion")}>
                Crear cotización
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/imprimir-factura")}>
                Imprimir factura
              </NavDropdown.Item>
            </NavDropdown>

            {/* CONSULTAS */}
            <NavDropdown title="Consultas" id="consultas-nav-dropdown">
              <NavDropdown.Item onClick={() => handleNavigation("/productos")}>
                Productos
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/clientes")}>
                Clientes
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/proveedores")}>
                Proveedores
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/cotizaciones-realizadas")}>
                Cotizaciones realizadas
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/facturas-emitidas")}>
                Facturas emitidas
              </NavDropdown.Item>
            </NavDropdown>

            {/* DOCUMENTOS */}
            <NavDropdown title="Documentos" id="documentos-nav-dropdown">
              <NavDropdown.Item onClick={() => handleNavigation("/facturas")}>
                Facturas
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/cotizaciones")}>
                Cotizaciones
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/pedidos-proveedores")}>
                Pedidos a proveedores
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/comprobantes")}>
                Comprobantes de entradas/salidas
              </NavDropdown.Item>
            </NavDropdown>

            {/* REPORTES */}
            <NavDropdown title="Reportes" id="reportes-nav-dropdown">
              <NavDropdown.Item onClick={() => handleNavigation("/ventas-por-periodo")}>
                Ventas por día/semana/mes
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/inventario-reporte")}>
                Inventario
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/compras-proveedores")}>
                Compras a proveedores
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/facturacion-periodo")}>
                Facturación por periodo
              </NavDropdown.Item>
            </NavDropdown>

            {/* ESTADÍSTICAS */}
            <NavDropdown title="Estadísticas" id="estadisticas-nav-dropdown">
              <NavDropdown.Item onClick={() => handleNavigation("/productos-mas-vendidos")}>
                Productos más vendidos
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/clientes-destacados")}>
                Clientes destacados
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/proveedores-frecuentes")}>
                Proveedores frecuentes
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/graficas-ventas")}>
                Gráficas comparativas de ventas
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/proyeccion-demanda")}>
                Proyección de demanda
              </NavDropdown.Item>
            </NavDropdown>

            {/* ADMINISTRACIÓN */}
            <NavDropdown title="Administración" id="admin-nav-dropdown">
              <NavDropdown.Item onClick={() => handleNavigation("/usuarios")}>
                Usuarios y roles
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/permisos")}>
                Permisos por rol
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/configuracion-empresa")}>
                Configuración de la empresa
              </NavDropdown.Item>
            </NavDropdown>

            {/* AYUDA */}
            <NavDropdown title="Ayuda" id="ayuda-nav-dropdown">
              <NavDropdown.Item onClick={() => handleNavigation("/manual-usuario")}>
                Manual de usuario
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/tutoriales")}>
                Tutoriales
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation("/acerca")}>
                Acerca del sistema
              </NavDropdown.Item>
            </NavDropdown>

            {/* CERRAR SESIÓN */}
            <Nav.Link onClick={() => handleNavigation("/logout")}>Cerrar sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
