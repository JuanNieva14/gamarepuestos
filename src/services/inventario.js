// src/services/inventario.js
const BASE_URL = "http://localhost:8001";

export async function obtenerInventario() {
  const res = await fetch(`${BASE_URL}/inventario`);
  if (!res.ok) throw new Error("Error al obtener inventario");
  return await res.json();
}

export async function actualizarStock(codigo_producto, nuevo_stock) {
  const res = await fetch(`${BASE_URL}/inventario/${codigo_producto}?nuevo_stock=${nuevo_stock}`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Error al actualizar stock");
  return await res.json();
}
