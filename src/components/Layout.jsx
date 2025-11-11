import React from "react";
import NavbarApp from "./NavbarApp";
import { Container } from "react-bootstrap";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <NavbarApp />

      <main className="layout-content">
        <Container fluid className="py-4">
          {children}
        </Container>
      </main> 

      <footer className="layout-footer text-center text-light py-3">
        <p className="mb-0">
          © {new Date().getFullYear()} Gama Repuestos Quibdó — Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
