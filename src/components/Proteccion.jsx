import React from "react";
import { Navigate } from "react-router-dom";

export default function Proteccion({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Si no está logueado, redirige al login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Si está logueado, muestra la página normalmente
  return children;
}
