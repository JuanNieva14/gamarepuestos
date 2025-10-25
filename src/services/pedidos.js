import axios from "axios";
const API_URL = "http://localhost:8001";

export const listarPedidos = () => axios.get(`${API_URL}/pedidos`);
export const crearPedido = (data) => axios.post(`${API_URL}/pedidos`, data);
export const actualizarPedido = (id, data) => axios.put(`${API_URL}/pedidos/${id}`, data);
export const eliminarPedido = (id) => axios.delete(`${API_URL}/pedidos/${id}`);

export const listarProveedores = () => axios.get(`${API_URL}/proveedores`);
export const listarUsuarios = () => axios.get(`${API_URL}/usuarios`);
export const listarEstadosPedido = () => axios.get(`${API_URL}/estados`);
