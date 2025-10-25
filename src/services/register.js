// src/services/register.js
const BASE_URL = "http://localhost:8001"; // Ajusta si tu backend usa otro puerto

export async function registrarCuenta(datos) {
  try {
    const res = await fetch(`${BASE_URL}/register_persona_usuario`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Error al registrar usuario");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en registrarCuenta:", error);
    throw error;
  }
}
