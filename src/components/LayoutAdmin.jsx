import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavbarAdministracion from "./NavbarAdministracion";
import "./LayoutAdmin.css";

export default function LayoutAdmin({ children }) {
  const location = useLocation();
  const [progreso, setProgreso] = useState(0);
  const [visitadas, setVisitadas] = useState(new Set());

  // Rutas administrativas
  const subpaginasAdmin = [
    "/admin/inicio",
    "/admin/facturas",
    "/admin/cotizaciones",
    "/admin/pedidosproveedores",
    "/admin/ventasperiodo",
    "/admin/comprasproveedores",
    "/admin/facturacionperiodo",
    "/admin/inventarioreporte",
    "/admin/productosmasvendidos",
    "/admin/clientesdestacados",
    "/admin/proveedoresfrecuentes",
    "/admin/graficasventas",
    "/admin/proyecciondemanda",
    "/admin/configuracionempresa",
    "/admin/usuarios",
  ];

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      setVisitadas((prev) => {
        const nuevas = new Set(prev);
        nuevas.add(location.pathname);
        const nuevoProgreso = Math.min(
          (nuevas.size / subpaginasAdmin.length) * 100,
          100
        );
        setProgreso(nuevoProgreso);
        window.dispatchEvent(
          new CustomEvent("actualizarProgreso", { detail: nuevoProgreso })
        );
        return nuevas;
      });
    } else {
      setProgreso(0);
      setVisitadas(new Set());
    }
  }, [location.pathname]);

  // 🎨 Color: blanco → rojo → vino
  const calcularColor = (valor) => {
    const r = 255;
    const g = Math.max(255 - valor * 2, 0);
    const b = Math.max(255 - valor * 2, 0);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="layout-admin">
      <NavbarAdministracion />

      <main className="admin-main-content">{children}</main>

        {/* 🔘 Círculo flotante con tooltip a la izquierda */}
        {location.pathname.startsWith("/admin") && (
        <div
            className="floating-progress"
            data-tooltip={`${Math.round(progreso)}% de progreso administrativo`}
        >
            <svg className="progress-ring" viewBox="0 0 36 36">
            <path
                className="progress-ring-bg"
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
                className="progress-ring-fill"
                stroke={calcularColor(progreso)}
                strokeDasharray={`${progreso}, 100`}
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            </svg>

            {/* Porcentaje dentro del círculo */}
            <span
            className="progress-text"
            style={{ color: calcularColor(progreso) }}
            >
            {Math.round(progreso)}%
            </span>
        </div>
        )}



      <footer className="admin-footer">
        <p>
          © {new Date().getFullYear()} <strong>Gama Repuestos Quibdó</strong> — Panel
          Administrativo. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
