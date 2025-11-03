import axios from "axios";



const API_URL = "http://localhost:8001/cotizaciones";

export const obtenerClientes = async () => {
  const response = await axios.get(`${API_URL}/clientes`);
  return response.data;
};

export const obtenerProductos = async () => {
  const response = await axios.get(`${API_URL}/productos`);
  return response.data;
};

export const crearCotizacion = async (cotizacion) => {
  const response = await axios.post(`${API_URL}/crear`, cotizacion);
  return response.data;
};
