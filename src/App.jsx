import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Páginas
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Categorias from "./pages/Categorias";
import Estados from "./pages/Estados";
import RegistroProductos from "./pages/RegistroProductos";
import Acerca from "./pages/Acerca";
import ManualUsuario from "./pages/ManualUsuario";
import Tipos from "./pages/Tipos";
import Personas from "./pages/Personas";
import FormasPago from "./pages/FormasPago";
import Pedidos from "./pages/Pedidos";
import Inventario from "./pages/Inventario";
import VentaProductos from "./pages/VentaProductos";
import ActualizarStock from "./pages/ActualizarStock";
import CrearCotizacion from "./pages/CrearCotizacion";
import ImprimirFactura from "./pages/ImprimirFactura";
import Clientes from "./pages/Clientes";
import Proveedores from "./pages/Proveedores";
import CotizacionesRealizadas from "./pages/CotizacionesRealizadas";
import FacturasEmitidas from "./pages/FacturasEmitidas";
import Facturas from "./pages/Facturas";
import Cotizaciones from "./pages/Cotizaciones";
import PedidosProveedores from "./pages/PedidosProveedores";
import Comprobantes from "./pages/Comprobantes";
import VentasPeriodo from "./pages/VentasPeriodo";
import InventarioReporte from "./pages/InventarioReporte";
import ComprasProveedores from "./pages/ComprasProveedores";
import FacturacionPeriodo from "./pages/FacturacionPeriodo";
import ProductosMasVendidos from "./pages/ProductosMasVendidos";
import ClientesDestacados from "./pages/ClientesDestacados";
import ProveedoresFrecuentes from "./pages/ProveedoresFrecuentes";
import GraficasVentas from "./pages/GraficasVentas";
import ProyeccionDemanda from "./pages/ProyeccionDemanda";
import Usuarios from "./pages/Usuarios";
import Permisos from "./pages/Permisos";
import ConfiguracionEmpresa from "./pages/ConfiguracionEmpresa";
import Tutoriales from "./pages/Tutoriales";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
{/* INICIO */}
          <Route index element={<Inicio />} />

          {/* BÁSICO */}
          <Route path="categorias" element={<Categorias />} />
          <Route path="tipos" element={<Tipos />} />
          <Route path="personas" element={<Personas />} />
          <Route path="formaspago" element={<FormasPago />} />
          <Route path="estados" element={<Estados />} />

          {/* GESTIÓN */}
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="registroproductos" element={<RegistroProductos />} />
          <Route path="ventaproductos" element={<VentaProductos />} />
          <Route path="actualizarstock" element={<ActualizarStock />} />
          <Route path="crearcotizacion" element={<CrearCotizacion />} />
          <Route path="imprimirfactura" element={<ImprimirFactura />} />

          {/* CONSULTAS */}
          <Route path="productos" element={<Productos />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="cotizacionesrealizadas" element={<CotizacionesRealizadas />} />
          <Route path="facturasemitidas" element={<FacturasEmitidas />} />

          {/* DOCUMENTOS */}
          <Route path="facturas" element={<Facturas />} />
          <Route path="cotizaciones" element={<Cotizaciones />} />
          <Route path="pedidosproveedores" element={<PedidosProveedores />} />
          <Route path="comprobantes" element={<Comprobantes />} />

          {/* REPORTES */}
          <Route path="ventasperiodo" element={<VentasPeriodo />} />
          <Route path="inventarioreporte" element={<InventarioReporte />} />
          <Route path="comprasproveedores" element={<ComprasProveedores />} />
          <Route path="facturacionperiodo" element={<FacturacionPeriodo />} />

          {/* ESTADÍSTICAS */}
          <Route path="productosmasvendidos" element={<ProductosMasVendidos />} />
          <Route path="clientesdestacados" element={<ClientesDestacados />} />
          <Route path="proveedoresfrecuentes" element={<ProveedoresFrecuentes />} />
          <Route path="graficasventas" element={<GraficasVentas />} />
          <Route path="proyecciondemanda" element={<ProyeccionDemanda />} />

          {/* ADMINISTRACIÓN */}
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="permisos" element={<Permisos />} />
          <Route path="configuracionempresa" element={<ConfiguracionEmpresa />} />

          {/* AYUDA */}
          <Route path="manualusuario" element={<ManualUsuario />} />
          <Route path="tutoriales" element={<Tutoriales />} />
          <Route path="acerca" element={<Acerca />} />
        </Routes>
      </Layout>
    </Router>
  );
}
