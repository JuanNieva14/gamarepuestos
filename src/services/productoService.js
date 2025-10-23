import api from "./api";

export const listarProductos = async () => {
  const { data } = await api.get("/productos");
  return data;
};

export const crearProducto = async (producto) => {
  const { data } = await api.post("/productos", producto);
  return data;
};

export const actualizarProducto = async (id, producto) => {
  const { data } = await api.put(`/productos/${id}`, producto);
  return data;
};

export const eliminarProducto = async (id) => {
  const { data } = await api.delete(`/productos/${id}`);
  return data;
};
