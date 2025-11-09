import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/Proteccion"; // ✅ ruta protegida

// Páginas
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
import Facturas from "./pages/DocumentosFacturas";
import Cotizaciones from "./pages/Documentos_Cotizaciones";
import PedidosProveedores from "./pages/Documentos_PedidosProveedores";
import VentasPeriodo from "./pages/VentasPeriodo";
import InventarioReporte from "./pages/InventarioReporte";
import ComprasProveedores from "./pages/ComprasProveedores";
import FacturacionPeriodo from "./pages/ReporteFacturacionPeriodo";
import ProductosMasVendidos from "./pages/ProductosMasVendidos";
import ClientesDestacados from "./pages/ClientesDestacados";
import ProveedoresFrecuentes from "./pages/ProveedoresFrecuentes";
import GraficasVentas from "./pages/GraficasVentas";
import ProyeccionDemanda from "./pages/ProyeccionDemanda";
import Usuarios from "./pages/Usuarios";
import Permisos from "./pages/Permisos";
import ConfiguracionEmpresa from "./pages/ConfiguracionEmpresa";
import Tutoriales from "./pages/Tutoriales";
import Register from "./pages/Register";
import RecuperarContraseña from "./pages/RecuperarContraseña";
import Login from "./pages/Login";



export default function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ RUTAS PÚBLICAS */}
        <Route path="/" element={<Login />} />           {/* ← ahora el login es la raíz */}
        <Route path="/login" element={<Login />} />      {/* opcional, para acceso directo */}
        <Route path="/register" element={<Register />} />
        <Route path="/recuperarcontraseña" element={<RecuperarContraseña />} />

        {/* 🔒 RUTAS PROTEGIDAS */}
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


        {/* BÁSICO */}
        <Route
          path="/categorias"
          element={
            <ProtectedRoute>
              <Layout>
                <Categorias />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/danos"
          element={
            <ProtectedRoute>
              <Layout>
                <Danos />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/personas"
          element={
            <ProtectedRoute>
              <Layout>
                <Personas />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/formaspago"
          element={
            <ProtectedRoute>
              <Layout>
                <FormasPago />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/estados"
          element={
            <ProtectedRoute>
              <Layout>
                <Estados />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* GESTIÓN */}
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

        <Route
          path="/creaccionproveedores"
          element={
            <ProtectedRoute>
              <Layout>
                <CreaccionProveedores />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/registroproductos"
          element={
            <ProtectedRoute>
              <Layout>
                <RegistroProductos />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ventaproductos"
          element={
            <ProtectedRoute>
              <Layout>
                <VentaProductos />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/actualizarstock"
          element={
            <ProtectedRoute>
              <Layout>
                <ActualizarStock />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/crearcotizacion"
          element={
            <ProtectedRoute>
              <Layout>
                <CrearCotizacion />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* CONSULTAS */}
        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <Layout>
                <Productos />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              <Layout>
                <Clientes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/proveedores"
          element={
            <ProtectedRoute>
              <Layout>
                <Proveedores />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cotizacionesrealizadas"
          element={
            <ProtectedRoute>
              <Layout>
                <CotizacionesRealizadas />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/facturasemitidas"
          element={
            <ProtectedRoute>
              <Layout>
                <FacturasEmitidas />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* DOCUMENTOS */}
        <Route
          path="/facturas"
          element={
            <ProtectedRoute>
              <Layout>
                <Facturas />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cotizaciones"
          element={
            <ProtectedRoute>
              <Layout>
                <Cotizaciones />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pedidosproveedores"
          element={
            <ProtectedRoute>
              <Layout>
                <PedidosProveedores />
              </Layout>
            </ProtectedRoute>
          }
        />
        

        {/* REPORTES */}
        <Route
          path="/ventasperiodo"
          element={
            <ProtectedRoute>
              <Layout>
                <VentasPeriodo />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventarioreporte"
          element={
            <ProtectedRoute>
              <Layout>
                <InventarioReporte />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/comprasproveedores"
          element={
            <ProtectedRoute>
              <Layout>
                <ComprasProveedores />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/facturacionperiodo"
          element={
            <ProtectedRoute>
              <Layout>
                <FacturacionPeriodo />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ESTADÍSTICAS */}
        <Route
          path="/productosmasvendidos"
          element={
            <ProtectedRoute>
              <Layout>
                <ProductosMasVendidos />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientesdestacados"
          element={
            <ProtectedRoute>
              <Layout>
                <ClientesDestacados />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/proveedoresfrecuentes"
          element={
            <ProtectedRoute>
              <Layout>
                <ProveedoresFrecuentes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/graficasventas"
          element={
            <ProtectedRoute>
              <Layout>
                <GraficasVentas />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/proyecciondemanda"
          element={
            <ProtectedRoute>
              <Layout>
                <ProyeccionDemanda />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ADMINISTRACIÓN */}
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <Layout>
                <Usuarios />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/permisos"
          element={
            <ProtectedRoute>
              <Layout>
                <Permisos />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/configuracionempresa"
          element={
            <ProtectedRoute>
              <Layout>
                <ConfiguracionEmpresa />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* AYUDA */}
        <Route
          path="/manualusuario"
          element={
            <ProtectedRoute>
              <Layout>
                <ManualUsuario />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutoriales"
          element={
            <ProtectedRoute>
              <Layout>
                <Tutoriales />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/acerca"
          element={
            <ProtectedRoute>
              <Layout>
                <Acerca />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
