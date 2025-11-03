import axios from "axios";

const API_URL = "http://localhost:8001/consulta_productos";

export const obtenerProductos = async (nombre = "", categoria = "", estado = "") => {
  const response = await axios.get(API_URL, { params: { nombre, categoria, estado } });
  return response.data;
};
