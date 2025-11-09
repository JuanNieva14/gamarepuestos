// src/services/facturas.js
const BASE_URL = "http://localhost:8001";

export async function obtenerFacturas() {
  const res = await fetch(`${BASE_URL}/facturas`);
  if (!res.ok) throw new Error("Error al obtener facturas");
  return await res.json();
}

export async function obtenerDetalleFactura(id_factura) {
  const res = await fetch(`${BASE_URL}/facturas/${id_factura}`);
  if (!res.ok) throw new Error("Error al obtener detalle de factura");
  return await res.json();
}
