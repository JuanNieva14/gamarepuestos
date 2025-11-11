import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LayoutAdmin from "../components/LayoutAdmin";

// 🏠 Página principal del panel
import AdminInicio from "./AdminInicio";

// 📄 Documentos
import DocumentosFacturas from "./DocumentosFacturas";
import Documentos_Cotizaciones from "./Documentos_Cotizaciones";
import Documentos_PedidosProveedores from "./Documentos_PedidosProveedores";

// ⚙️ Configuración
import ConfiguracionEmpresa from "./ConfiguracionEmpresa";

// 📊 Reportes
import ReporteComprasProveedores from "./ReporteComprasProveedores";
import ReporteFacturacionPeriodo from "./ReporteFacturacionPeriodo";
import ReporteVentasPeriodo from "./ReporteVentasPeriodo";
import ReporteInventario from "./ReporteInventario";

// 📈 Estadísticas
import ProductosMasVendidos from "./EstadisticaProductosMasVendidos";
import ClientesDestacados from "./EstadisticaClientesDestacados";
import ProveedoresFrecuentes from "./EstadisticaProveedoresFrecuentes";
import GraficasVentas from "./EstadisticaGraficasVentas";
import ProyeccionDemanda from "./EstadisticaProyeccionDemanda";

// Usuarios
import Usuarios from "./Usuarios";

/**
 * 🧭 PanelAdministrativo
 * Este componente controla todas las rutas internas del panel de administración.
 * Cada sección se renderiza dentro del LayoutAdmin (que incluye el Navbar lateral y el pie de página).
 */
export default function PanelAdministrativo() {
  return (
    <div className="Layout-admin">
    <LayoutAdmin>
      <Routes>
        {/* 🏠 Página principal del panel */}
        <Route path="inicio" element={<AdminInicio />} />

        {/* 📂 Sección Documentos */}
        <Route path="facturas" element={<DocumentosFacturas />} />
        <Route path="cotizaciones" element={<Documentos_Cotizaciones />} />
        <Route path="pedidosproveedores" element={<Documentos_PedidosProveedores />} />

        {/* 📊 Sección Reportes */}
        <Route path="ventasperiodo" element={<ReporteVentasPeriodo />} />
        <Route path="inventarioreporte" element={<ReporteInventario />} />
        <Route path="comprasproveedores" element={<ReporteComprasProveedores />} />
        <Route path="facturacionperiodo" element={<ReporteFacturacionPeriodo />} />

        {/* 📈 Sección Estadísticas */}
        <Route path="productosmasvendidos" element={<ProductosMasVendidos />} />
        <Route path="clientesdestacados" element={<ClientesDestacados />} />
        <Route path="proveedoresfrecuentes" element={<ProveedoresFrecuentes />} />
        <Route path="graficasventas" element={<GraficasVentas />} />
        <Route path="proyecciondemanda" element={<ProyeccionDemanda />} />

        {/* Usuarios */}
        <Route path="usuarios" element={<Usuarios/>}></Route>

        {/* ⚙️ Configuración */}
        <Route path="configuracionempresa" element={<ConfiguracionEmpresa />} />

        {/* 🚪 Redirección predeterminada */}
        <Route index element={<Navigate to="inicio" replace />} />

        {/* ⚠️ Fallback - ruta desconocida */}
        <Route path="*" element={<Navigate to="inicio" replace />} />
      </Routes>
    </LayoutAdmin>
    </div>
  );
}
