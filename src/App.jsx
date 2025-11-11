import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/Proteccion";
import RutaProtegidaRol from "./components/RutaProtegidaRol";
import PanelAdministracion from "./pages/PanelAdministrativo";

// 📄 Páginas
import Inicio from "./pages/Inicio";
import CreaccionProveedores from "./pages/Creaccion_Proveedores";
import Productos from "./pages/Consulta_Productos";
import Categorias from "./pages/Categorias";
import Estados from "./pages/Estados";
import RegistroProductos from "./pages/RegistroProductos";
import Acerca from "./pages/Acerca";
import ManualUsuario from "./pages/ManualUsuario";
import Danos from "./pages/Danos";
import Personas from "./pages/Personas";
import FormasPago from "./pages/FormasPago";
import GestionPedidosProveedor from "./pages/GestionPedidosProveedor";
import Inventario from "./pages/Inventario";
import VentaProductos from "./pages/VentaProductos";
import ActualizarStock from "./pages/ActualizarStock";
import CrearCotizacion from "./pages/CrearCotizacion";
import Clientes from "./pages/Consulta_Clientes";
import Proveedores from "./pages/Consulta_Proveedores";
import CotizacionesRealizadas from "./pages/Consulta_CotizacionesRealizadas";
import FacturasEmitidas from "./pages/FacturasEmitidas";

import VentasPeriodo from "./pages/ReporteVentasPeriodo";
import InventarioReporte from "./pages/ReporteInventario";
import ComprasProveedores from "./pages/ReporteComprasProveedores";
import FacturacionPeriodo from "./pages/ReporteFacturacionPeriodo";
import ProductosMasVendidos from "./pages/EstadisticaProductosMasVendidos";
import ClientesDestacados from "./pages/EstadisticaClientesDestacados";
import ProveedoresFrecuentes from "./pages/EstadisticaProveedoresFrecuentes";
import GraficasVentas from "./pages/EstadisticaGraficasVentas";
import ProyeccionDemanda from "./pages/EstadisticaProyeccionDemanda";

import Usuarios from "./pages/Usuarios";
import Permisos from "./pages/Permisos";
import ConfiguracionEmpresa from "./pages/ConfiguracionEmpresa";
import Tutoriales from "./pages/Tutoriales";
import Register from "./pages/Register";
import RecuperarContraseña from "./pages/RecuperarContraseña";
import Login from "./pages/Login";
import AdminInicio from "./pages/AdminInicio";

// 🔴 Documentos (para el panel admin)
import Documentos_Facturas from "./pages/DocumentosFacturas";
import Documentos_Cotizaciones from "./pages/Documentos_Cotizaciones";
import Documentos_PedidosProveedores from "./pages/Documentos_PedidosProveedores";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🔓 RUTAS PÚBLICAS */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recuperarcontraseña" element={<RecuperarContraseña />} />

        {/* 🔒 RUTA GENERAL PROTEGIDA */}
        <Route
          path="/inicio"
          element={
            <ProtectedRoute>
              <Layout>
                <Inicio />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* 🧱 MÓDULOS BÁSICOS */}
        {[
          { path: "/categorias", element: <Categorias /> },
          { path: "/danos", element: <Danos /> },
          { path: "/personas", element: <Personas /> },
          { path: "/formaspago", element: <FormasPago /> },
          { path: "/estados", element: <Estados /> },
          { path: "/productos", element: <Productos /> },
          { path: "/clientes", element: <Clientes /> },
          { path: "/proveedores", element: <Proveedores /> },
          { path: "/creaccionproveedores", element: <CreaccionProveedores /> },
          { path: "/registroproductos", element: <RegistroProductos /> },
          { path: "/ventaproductos", element: <VentaProductos /> },
          { path: "/actualizarstock", element: <ActualizarStock /> },
          { path: "/crearcotizacion", element: <CrearCotizacion /> },
          { path: "/cotizacionesrealizadas", element: <CotizacionesRealizadas /> },
          { path: "/facturasemitidas", element: <FacturasEmitidas /> },
          { path: "/manualusuario", element: <ManualUsuario /> },
          { path: "/tutoriales", element: <Tutoriales /> },
          { path: "/acerca", element: <Acerca /> },
        ].map((r, i) => (
          <Route
            key={`basico-${i}`}
            path={r.path}
            element={
              <ProtectedRoute>
                <Layout>{r.element}</Layout>
              </ProtectedRoute>
            }
          />
        ))}

        {/* 📦 GESTIÓN */}
        <Route
          path="/gestionpedidosproveedor"
          element={
            <ProtectedRoute>
              <Layout>
                <GestionPedidosProveedor />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* 🏷️ INVENTARIO */}
        <Route
          path="/inventario"
          element={
            <ProtectedRoute>
              <Layout>
                <Inventario />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ⚙️ PANEL ADMINISTRATIVO CON RUTAS INTERNAS */}
        <Route
          path="/admin/*"
          element={
            <RutaProtegidaRol rolesPermitidos={["ADMINISTRADOR"]}>
              <PanelAdministracion />
            </RutaProtegidaRol>
          }
          
        > <Route path="inicio" element={<AdminInicio />} />  {/* 🏠 NUEVO INICIO */}
          {/* 📂 DOCUMENTOS */}
          <Route path="facturas" element={< Documentos_Facturas/>} />
          <Route path="cotizaciones" element={<Documentos_Cotizaciones />} />
          <Route path="pedidosproveedores" element={<Documentos_PedidosProveedores />} />

          {/* 📊 REPORTES */}
          <Route path="ventasperiodo" element={<VentasPeriodo />} />
          <Route path="inventarioreporte" element={<InventarioReporte />} />
          <Route path="comprasproveedores" element={<ComprasProveedores />} />
          <Route path="facturacionperiodo" element={<FacturacionPeriodo />} />

          {/* 📈 ESTADÍSTICAS */}
          <Route path="productosmasvendidos" element={<ProductosMasVendidos />} />
          <Route path="clientesdestacados" element={<ClientesDestacados />} />
          <Route path="proveedoresfrecuentes" element={<ProveedoresFrecuentes />} />
          <Route path="graficasventas" element={<GraficasVentas />} />
          <Route path="proyecciondemanda" element={<ProyeccionDemanda />} />

          {/* ⚙️ CONFIGURACIÓN */}
          <Route path="configuracionempresa" element={<ConfiguracionEmpresa />} />

          {/* Ruta por defecto del panel */}
          <Route index element={<Navigate to="inicio" replace />} />
        </Route>

        {/* 🔁 Redirección general */}
        <Route path="*" element={<Navigate to="/inicio" replace />} />
      </Routes>
    </Router>
  );
}
