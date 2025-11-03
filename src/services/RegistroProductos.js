// src/services/registroProductos.js
const BASE_URL = "http://localhost:8001";

export async function registrarProducto(data) {
  const res = await fetch(`${BASE_URL}/registroproductos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al registrar producto");
  return await res.json();
}

export async function obtenerCategorias() {
  const res = await fetch(`${BASE_URL}/categorias`);
  if (!res.ok) throw new Error("Error al obtener categorías");
  return await res.json();
}

export async function obtenerClasificaciones() {
  const res = await fetch(`${BASE_URL}/clasificaciones`);
  if (!res.ok) throw new Error("Error al obtener clasificaciones");
  return await res.json();
}
