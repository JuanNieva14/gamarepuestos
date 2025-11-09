import axios from "axios";

const API_URL = "http://localhost:8001/compras_proveedores";

export async function obtenerComprasProveedores(busqueda = "", mes = "Todos") {
  try {
    const res = await axios.get(API_URL, {
      params: { busqueda, mes },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener compras:", error);
    return { success: false, data: [] };
  }
}
