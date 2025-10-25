// services/login.js
export async function loginUsuario(datos) {
  try {
    const respuesta = await fetch("http://localhost:8001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    if (!respuesta.ok) {
      throw new Error("Credenciales incorrectas");
    }

    const resultado = await respuesta.json();
    localStorage.setItem("usuario", resultado.usuario);
    return resultado;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}
