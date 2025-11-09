// src/services/cotizaciones.js
const BASE_URL = "http://localhost:8001";

export async function obtenerCotizaciones() {
  const res = await fetch(`${BASE_URL}/cotizaciones`);
  if (!res.ok) throw new Error("Error al obtener cotizaciones");
  return await res.json();
}

export async function obtenerDetalleCotizacion(id) {
  const res = await fetch(`${BASE_URL}/cotizaciones/${id}`);
  if (!res.ok) throw new Error("Error al obtener detalle de cotización");
  return await res.json();
}
