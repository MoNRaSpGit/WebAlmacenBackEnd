import { db } from "../config/db.js";

// 📦 Obtener todos los productos activos
export const getProductos = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, price, image, barcode, description FROM productos_test WHERE status = 'activo'"
    );
    res.json(rows);
  } catch (err) {
    console.error("❌ Error al obtener productos:", err.message);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// 📦 Obtener un solo producto
export const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      "SELECT id, name, price, image, barcode, description FROM productos_test WHERE id = ?",
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error al obtener producto:", err.message);
    res.status(500).json({ error: "Error al obtener producto" });
  }
};
