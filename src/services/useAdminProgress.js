import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook personalizado para medir el progreso de navegación dentro del panel administrativo
 */
export default function useAdminProgress() {
  const location = useLocation();
  const [visitedRoutes, setVisitedRoutes] = useState(() => {
    const saved = localStorage.getItem("adminProgress");
    return saved ? JSON.parse(saved) : [];
  });

  // 🔹 Todas las rutas que cuentan para el progreso
  const adminPaths = [
    "/admin/inicio",
    "/admin/facturas",
    "/admin/cotizaciones",
    "/admin/pedidosproveedores",
    "/admin/ventasperiodo",
    "/admin/inventarioreporte",
    "/admin/comprasproveedores",
    "/admin/facturacionperiodo",
    "/admin/productosmasvendidos",
    "/admin/clientesdestacados",
    "/admin/proveedoresfrecuentes",
    "/admin/graficasventas",
    "/admin/proyecciondemanda",
    "/admin/configuracionempresa",
  ];

  // 🔹 Detecta cambio de ruta y registra la visita
  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      if (!visitedRoutes.includes(location.pathname)) {
        const updated = [...visitedRoutes, location.pathname];
        setVisitedRoutes(updated);
        localStorage.setItem("adminProgress", JSON.stringify(updated));
      }
    } else {
      // Si sale del panel admin, reinicia el progreso
      setVisitedRoutes([]);
      localStorage.removeItem("adminProgress");
    }
  }, [location]);

  // 🔹 Cálculo del porcentaje
  const progress =
    (visitedRoutes.length / adminPaths.length) * 100 > 100
      ? 100
      : (visitedRoutes.length / adminPaths.length) * 100;

  return { progress, visitedRoutes, total: adminPaths.length };
}
