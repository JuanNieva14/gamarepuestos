import axios from "axios";

const API_URL = "http://localhost:8001/consulta_clientes";

export const obtenerClientes = async (busqueda = "") => {
  const res = await axios.get(API_URL, { params: { busqueda } });
  return res.data;
};
