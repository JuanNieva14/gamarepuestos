// inventarioService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8001/inventario_general/";

export const obtenerInventario = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(API_URL, {
      params: { page, page_size: pageSize },
    });

    if (response.data.success) {
      return response.data;
    } else {
      console.error("❌ Error al cargar inventario:", response.data.error);
      return { data: [] };
    }
  } catch (error) {
    console.error("⚠️ Error de conexión:", error);
    return { data: [] };
  }
};
