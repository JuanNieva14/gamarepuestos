import axios from "axios";

const API_URL = "http://localhost:8001/pedidos_proveedores";

// 🔹 Listar todos los pedidos
export const obtenerPedidos = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// 🔹 Crear nuevo pedido
export const crearPedido = async (pedido) => {
  const res = await axios.post(API_URL, pedido);
  return res.data;
};

// 🔹 Actualizar pedido
export const editarPedido = async (id, pedido) => {
  const res = await axios.put(`${API_URL}/${id}`, pedido);
  return res.data;
};

// 🔹 Eliminar pedido
export const eliminarPedido = async (id) => {
  const res = await axios.delete(`${API_URL}/eliminar/${id}`);
  return res.data;
};
