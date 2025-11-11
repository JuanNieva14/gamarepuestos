// components/RutaProtegidaRol.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RutaProtegidaRol({ children, rolesPermitidos }) {
  const [autorizado, setAutorizado] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");

    // Caso 1: No hay usuario logueado
    if (!userData) {
      Swal.fire({
        icon: "warning",
        title: "Sesión no iniciada",
        text: "Por favor, inicia sesión para continuar.",
        confirmButtonText: "Ir al inicio",
        confirmButtonColor: "#a00000",
        background: "linear-gradient(180deg, #1a0000, #400000)",
        color: "#fff",
      }).then(() => {
        setRedirect(true);
      });
      setAutorizado(false);
      return;
    }

    const usuario = JSON.parse(userData);
    const rolUsuario = usuario.rol?.toUpperCase();

    // Caso 2: Usuario sin permisos
    if (!rolesPermitidos.map(r => r.toUpperCase()).includes(rolUsuario)) {
      Swal.fire({
        icon: "error",
        title: "Acceso no autorizado 🚫",
        html: `
          <p style="font-size: 1.1rem; color: #fff; margin: 10px 0;">
            Esta sección está restringida a administradores.
          </p>
          <p style="color: #aaa; font-size: 0.9rem;">
            Contacta al administrador del sistema si crees que se trata de un error.
          </p>
        `,
        confirmButtonText: "Volver al inicio",
        confirmButtonColor: "#a00000",
        background: "linear-gradient(180deg, #1a0000, #400000)",
        color: "#fff",
        width: "40%",
        padding: "20px",
        backdrop: `
          rgba(0, 0, 0, 0.7)
          url("/imagenes/lock.gif")
          center top
          no-repeat
        `,
      }).then(() => {
        setRedirect(true);
      });

      setAutorizado(false);
      return;
    }

    // Caso 3: Usuario autorizado
    setAutorizado(true);
  }, [rolesPermitidos]);

  // Mientras valida
  if (autorizado === null && !redirect) return null;

  // Redirección automática
  if (redirect) return <Navigate to="/inicio" replace />;

  // Contenido si tiene permiso
  return children;
}
