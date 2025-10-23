import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8001", // ✅ tu backend FastAPI en puerto 8001
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
