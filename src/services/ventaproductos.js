import axios from "axios";
const API_URL = "http://localhost:8001/ventasproductos/";

export async function registrarVenta(datos) {
  try {
    const res = await axios.post(API_URL, datos);
    return res.data;
  } catch (error) {
    console.error("Error al registrar venta:", error);
    throw error;
  }
}
