import axios from "axios";
const API_URL = "http://localhost:8001";

export async function crearRegistro(tipo, data) {
  const endpoint =
    tipo === "categoria"
      ? `${API_URL}/categorias`
      : `${API_URL}/clasificaciones`;

  const res = await axios.post(endpoint, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}
