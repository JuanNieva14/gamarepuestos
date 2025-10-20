import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarApp from "./components/NavbarApp";

// Páginas de ejemplo
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Categorias from "./pages/Categorias";
import Estados from "./pages/Estados";

export default function App() {
  return (
    <Router>
      <NavbarApp />
      <div className="container mt-4">
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Inicio />} />

          {/* Módulos de prueba */}
          <Route path="/productos" element={<Productos />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/estados" element={<Estados />} />

          {/* Ruta de respaldo */}
          <Route
            path="*"
            element={
              <div className="text-center mt-5">
                <h3>404 - Página no encontrada</h3>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
