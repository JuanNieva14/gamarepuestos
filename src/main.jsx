import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Estilos globales
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/Layout.css";  // Asegura el fondo negro y estilo general

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
