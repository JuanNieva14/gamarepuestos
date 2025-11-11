import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HouseFill,
  FileEarmarkTextFill,
  BarChartFill,
  PieChartFill,
  GearFill,
  BoxArrowRight,
  PeopleFill,
} from "react-bootstrap-icons";
import "./NavbarAdministracion.css";

export default function NavbarAdministracion() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleOutsideClick = () => {
    if (activeMenu) setActiveMenu(null);
  };

  return (
    <div className="admin-navbar-container" onClick={handleOutsideClick}>
      <div className="sidebar-admin">
        {/* Inicio */}
        <div
          className={`icon-container ${activeMenu === "inicio" ? "active" : ""}`}
          title="Inicio del Panel"
          onClick={() => navigate("/admin/inicio")}
        >
          <HouseFill size={22} />
        </div>

        {/* Documentos */}
        <div
          className={`icon-container ${activeMenu === "documentos" ? "active" : ""}`}
          title="Documentos"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu("documentos");
          }}
        >
          <FileEarmarkTextFill size={22} />
        </div>
        {activeMenu === "documentos" && (
          <div className="submenu">
            <div onClick={() => navigate("/admin/facturas")}>Facturas</div>
            <div onClick={() => navigate("/admin/cotizaciones")}>Cotizaciones</div>
            <div onClick={() => navigate("/admin/pedidosproveedores")}>Pedidos a proveedores</div>
          </div>
        )}

        {/* Reportes */}
        <div
          className={`icon-container ${activeMenu === "reportes" ? "active" : ""}`}
          title="Reportes"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu("reportes");
          }}
        >
          <BarChartFill size={22} />
        </div>
        {activeMenu === "reportes" && (
          <div className="submenu">
            <div onClick={() => navigate("/admin/ventasperiodo")}>Ventas por período</div>
            <div onClick={() => navigate("/admin/comprasproveedores")}>Compras a proveedores</div>
            <div onClick={() => navigate("/admin/facturacionperiodo")}>Facturación</div>
          </div>
        )}

        {/* Estadísticas */}
        <div
          className={`icon-container ${activeMenu === "estadisticas" ? "active" : ""}`}
          title="Estadísticas"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu("estadisticas");
          }}
        >
          <PieChartFill size={22} />
        </div>
        {activeMenu === "estadisticas" && (
          <div className="submenu">
            <div onClick={() => navigate("/admin/productosmasvendidos")}>Productos más vendidos</div>
            <div onClick={() => navigate("/admin/clientesdestacados")}>Clientes destacados</div>
            <div onClick={() => navigate("/admin/proveedoresfrecuentes")}>Proveedores frecuentes</div>
            <div onClick={() => navigate("/admin/graficasventas")}>Gráficas de ventas</div>
            <div onClick={() => navigate("/admin/proyecciondemanda")}>Proyección de demanda</div>
          </div>
        )}

        {/* 👥 Usuarios */}
        <div
          className="icon-container"
          title="Gestión de usuarios"
          onClick={() => navigate("/admin/usuarios")}
        >
          <PeopleFill size={22} />
        </div>

        {/* ⚙️ Configuración */}
        <div
          className="icon-container"
          title="Configuración del sistema"
          onClick={() => navigate("/admin/configuracionempresa")}
        >
          <GearFill size={22} />
        </div>

        {/* 🚪 Salir del modo admin */}
        <div
          className="icon-container logout-icon"
          title="Salir del modo administrador"
          onClick={() => navigate("/inicio")}
        >
          <BoxArrowRight size={22} />
        </div>
      </div>
    </div>
  );
}
