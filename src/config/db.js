// src/config/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// 🧱 Crear el pool de conexión
export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "-03:00", // Uruguay
});

// 🧠 Test de conexión
try {
  const connection = await db.getConnection();
  await connection.query("SET time_zone = '-03:00'");
  connection.release();
  console.log("✅ Conectado a MySQL Clever Cloud (UTC-3)");
} catch (err) {
  console.error("❌ Error al conectar con Clever Cloud:", err.message);
}
