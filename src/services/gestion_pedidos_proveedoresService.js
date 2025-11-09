const API_URL = "http://localhost:8001/pedidos_proveedores";

export async function getPedidos() {
  const res = await fetch(`${API_URL}/`);
  return await res.json();
}

export async function getSelectProveedores() {
  const res = await fetch(`${API_URL}/proveedores_select`);
  return await res.json();
}

export async function getSelectVendedores() {
  const res = await fetch(`${API_URL}/vendedores_select`);
  return await res.json();
}

export async function getSelectEstados() {
  const res = await fetch(`${API_URL}/estados_select`);
  return await res.json();
}

export async function crearPedido(data) {
  const res = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}
