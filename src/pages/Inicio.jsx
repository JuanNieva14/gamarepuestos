import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Inicio.css";

export default function Inicio() {
  return (
    <div className="inicio">

      <section className="hero-section text-center text-light d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col>
              <h1 className="titulo-principal">
                Venta de Repuestos Para Motos
              </h1>
              <h2 className="subtitulo">Al Por Mayor</h2>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="marcas-section text-center py-5">
        <Container>
          <img
             src="/imagenes/logo192x192.png"
            alt="logo gama repuestos"
            className="logo-principal mb-4"
          />
          <p className="text-light">
            Importador exclusivo para Colombia de:
          </p>
          <div className="logos-marcas d-flex justify-content-center align-items-center gap-4 flex-wrap mt-3">
            <img src="./Imagenes/honda.png" alt="Honda " className="marca-logo" />
            <img src="/Imagenes/yamaha.png" alt="Yamaha" className="marca-logo" />
            <img src="/Imagenes/Suzuki.png" alt="Suzuki" className="marca-logo" />
            <img src="/Imagenes/hero.png" alt="Hero" className="marca-logo" />
          </div>
        </Container>
      </section>

      <section className="productos-section py-5 text-center">
        <Container>
          <h2 className="text-light mb-4">Nuestros Productos</h2>
          <img
            src="/imagenes/fondo1.png"
            alt="Gama Repuestos Quibdó"
            className="img-fluid shadow-lg rounded"
          />
        </Container>
      </section>

     
      
    </div>
  );
}
