// src/services/pedidosproveedores.js
const BASE_URL = "http://localhost:8001";

export async function obtenerPedidosProveedores() {
  const res = await fetch(`${BASE_URL}/pedidosproveedores`);
  if (!res.ok) throw new Error("Error al obtener pedidos de proveedores");
  return await res.json();
}

export async function obtenerDetallePedido(id) {
  const res = await fetch(`${BASE_URL}/pedidosproveedores/${id}`);
  if (!res.ok) throw new Error("Error al obtener detalle del pedido");
  return await res.json();
}
