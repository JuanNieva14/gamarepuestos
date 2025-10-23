import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ManualUsuario() {
  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Manual de Usuario - Gama Repuestos Quibdó", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Bienvenido al sistema de gestión Gama Repuestos Quibdó. Este manual te guiará paso a paso para usar correctamente todas las funciones del sistema.",
      20,
      35,
      { maxWidth: 170 }
    );

    // Sección 1
    doc.setFont("helvetica", "bold");
    doc.text("1. Inicio de Sesión", 20, 55);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Ingresa tu correo y contraseña en la pantalla de inicio. Si olvidas tu contraseña, puedes recuperarla desde el enlace '¿Olvidaste tu contraseña?'.",
      20,
      63,
      { maxWidth: 170 }
    );

    // Sección 2
    doc.setFont("helvetica", "bold");
    doc.text("2. Menú Principal", 20, 80);
    doc.setFont("helvetica", "normal");
    doc.text(
      "El sistema cuenta con un menú superior organizado por módulos: Básico, Gestión, Consultas, Documentos, Reportes, Estadísticas, Administración y Ayuda.",
      20,
      88,
      { maxWidth: 170 }
    );

    // Sección 3
    doc.setFont("helvetica", "bold");
    doc.text("3. Registro de Productos", 20, 105);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Desde 'Gestión > Registro de Productos' puedes agregar nuevos productos indicando su categoría, tipo, precio, proveedor y estado. También puedes actualizar o eliminar registros.",
      20,
      113,
      { maxWidth: 170 }
    );

    // Sección 4
    doc.setFont("helvetica", "bold");
    doc.text("4. Ventas y Facturación", 20, 130);
    doc.setFont("helvetica", "normal");
    doc.text(
      "En 'Gestión > Venta de Productos' puedes registrar ventas, aplicar descuentos y generar facturas en formato PDF. Los totales se calculan automáticamente.",
      20,
      138,
      { maxWidth: 170 }
    );

    // Sección 5
    doc.setFont("helvetica", "bold");
    doc.text("5. Consultas y Reportes", 20, 155);
    doc.setFont("helvetica", "normal");
    doc.text(
      "En los módulos de 'Consultas' y 'Reportes' podrás buscar productos, clientes, proveedores y visualizar estadísticas de ventas, inventario y facturación.",
      20,
      163,
      { maxWidth: 170 }
    );

    // Sección 6
    doc.setFont("helvetica", "bold");
    doc.text("6. Administración del Sistema", 20, 180);
    doc.setFont("helvetica", "normal");
    doc.text(
      "El administrador puede crear usuarios, asignar roles y definir permisos para controlar el acceso a los distintos módulos del sistema.",
      20,
      188,
      { maxWidth: 170 }
    );

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("© 2025 Gama Repuestos Quibdó - Sistema de Gestión Empresarial", 20, 280);

    doc.save("Manual_Usuario_Gama_Repuestos.pdf");
  };

  return (
    <Container className="py-4">
      <Card className="p-4 bg-dark text-light shadow-lg border-0">
        <h2 className="text-center text-danger mb-4">Manual de Usuario</h2>

        <p>
          Bienvenido al <strong>Sistema de Gestión Gama Repuestos Quibdó</strong>.  
          Aquí encontrarás una guía básica para utilizar las funciones más importantes del sistema, 
          incluyendo la gestión de productos, facturas, reportes y configuración de la empresa.
        </p>

        <ul>
          <li>Inicio de sesión y recuperación de contraseña.</li>
          <li>Gestión de productos, categorías y estados.</li>
          <li>Registro de ventas y facturación PDF.</li>
          <li>Consultas y reportes de inventario.</li>
          <li>Asignación de roles y permisos de usuario.</li>
          <li>Configuración general de la empresa.</li>
        </ul>

        <div className="text-center mt-4">
          <Button variant="danger" size="lg" onClick={generarPDF}>
            📄 Descargar Manual en PDF
          </Button>
        </div>
      </Card>
    </Container>
  );
}
