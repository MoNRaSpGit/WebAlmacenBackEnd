// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import productoRoutes from "./routes/productoRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";







dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.get("/favicon.ico", (req, res) => res.status(204).end());
app.use("/api/productos", productoRoutes);
app.use("/api/pedidos", pedidoRoutes);


// Ruta de prueba para verificar conexión
app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT NOW() AS hora_servidor");
    res.json({
      message: "Servidor WebAlmacenBackend corriendo 🏪",
      horaServidor: rows[0].hora_servidor,
    });
  } catch (err) {
    console.error("❌ Error al consultar DB:", err.message);
    res.status(500).json({ error: "Error de conexión con la base de datos" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor activo en puerto ${PORT}`));
