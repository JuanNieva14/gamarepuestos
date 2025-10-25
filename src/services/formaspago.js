import axios from "axios";

const API_URL = "http://localhost:8001/formas_pago";

export const listarFormasPago = () => axios.get(API_URL);
export const crearFormaPago = (data) => axios.post(API_URL, data);
export const actualizarFormaPago = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const eliminarFormaPago = (id) => axios.delete(`${API_URL}/${id}`);
