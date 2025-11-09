
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

    // ✅ Guardar el usuario correctamente en localStorage
    if (resultado.usuario) {
      localStorage.setItem("usuario", JSON.stringify(resultado.usuario));
    }

    // Después del login exitoso:
const user = res.data.usuario; // esto depende de tu backend
localStorage.setItem("usuario_sesion", JSON.stringify(user));


    return resultado;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}
