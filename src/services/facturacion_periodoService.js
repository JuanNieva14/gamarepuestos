import axios from "axios";

export const obtenerFacturacionPeriodo = async (busqueda = "", mes = "Todos") => {
  try {
    const res = await axios.get("http://localhost:8001/facturacion_periodo", {
      params: { busqueda, mes },
    });
    return res.data;
  } catch (error) {
    console.error("Error al obtener facturación:", error);
    return { success: false, data: [] };
  }
};
