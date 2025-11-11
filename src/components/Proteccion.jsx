// components/Proteccion.jsx
import { Navigate } from "react-router-dom";

export default function Proteccion({ children }) {
  const usuario = localStorage.getItem("usuario");

  // Si no existe usuario en localStorage, redirige al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si está logueado, renderiza el contenido
  return children;
}
