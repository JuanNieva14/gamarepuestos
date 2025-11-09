// 📁 ventasPorMesService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8001/ventas_por_mes/";

export const obtenerVentasPorMes = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response.data.success) {
      // Ordenar por fecha descendente (más reciente primero)
      const ventas = response.data.data.sort((a, b) => {
        return new Date(b.mes) - new Date(a.mes);
      });
      return ventas;
    } else {
      console.error("❌ Error al obtener ventas:", response.data.error);
      return [];
    }
  } catch (error) {
    console.error("⚠️ Error al conectar con el servidor:", error);
    return [];
  }
};
