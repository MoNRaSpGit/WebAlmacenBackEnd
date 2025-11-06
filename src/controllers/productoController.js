import { db } from "../config/db.js";

// 📦 Listar productos (paginado): ?limit=10&page=1
export const getProductos = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 10, 50); // máx 50 por seguridad
    const page  = Math.max(parseInt(req.query.page)  || 1, 1);
    const offset = (page - 1) * limit;

    // (opcional) orden por más recientes si tenés updated_at
    const [rows] = await db.query(
      `SELECT id, name, price, image, barcode, description
       FROM productos_test
       ORDER BY id DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
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
      `SELECT id, name, price, image, barcode, description
       FROM productos_test
       WHERE id = ?`,
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error al obtener producto:", err.message);
    res.status(500).json({ error: "Error al obtener producto" });
  }
};
