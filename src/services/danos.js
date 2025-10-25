import axios from "axios";

const API_URL = "http://localhost:8001/danos";

export const listarDanos = () => axios.get(API_URL);
export const crearDano = (data) => axios.post(API_URL, data);
export const actualizarDano = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const eliminarDano = (id) => axios.delete(`${API_URL}/${id}`);
