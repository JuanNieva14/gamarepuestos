import axios from "axios";

const API_URL = "http://localhost:8001/estados";

export const listarEstados = () => axios.get(API_URL);
export const crearEstado = (data) => axios.post(API_URL, data);
export const actualizarEstado = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const eliminarEstado = (id) => axios.delete(`${API_URL}/${id}`);
