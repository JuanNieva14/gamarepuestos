const BASE_URL = "http://localhost:8001";

export async function obtenerProveedores() {
  const res = await fetch(`${BASE_URL}/consulta_proveedores`);
  if (!res.ok) throw new Error("Error al obtener proveedores");
  return await res.json();
}

export async function crearProveedor(datos) {
  const res = await fetch(`${BASE_URL}/consulta_proveedores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!res.ok) throw new Error("Error al crear proveedor");
  return await res.json();
}

export async function editarProveedor(id, datos) {
  const res = await fetch(`${BASE_URL}/consulta_proveedores/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!res.ok) throw new Error("Error al actualizar proveedor");
  return await res.json();
}

export async function eliminarProveedor(id) {
  const res = await fetch(`${BASE_URL}/consulta_proveedores/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar proveedor");
  return await res.json();
}
