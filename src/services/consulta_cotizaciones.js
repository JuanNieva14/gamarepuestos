const BASE_URL = "http://localhost:8001";

export async function obtenerCotizaciones() {
  try {
    const res = await fetch(`${BASE_URL}/consulta_cotizaciones`);
    if (!res.ok) throw new Error("Error al cargar cotizaciones");
    return await res.json();
  } catch (error) {
    console.error("Error en obtenerCotizaciones:", error);
    throw error;
  }
}
