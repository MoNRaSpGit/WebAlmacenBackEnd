import { db } from "../config/db.js";

// 🧾 Crear nuevo pedido
export const crearPedido = async (req, res) => {
  const { cliente_nombre, cliente_contacto, total, observaciones, productos } = req.body;

  if (!productos || productos.length === 0) {
    return res.status(400).json({ error: "El pedido no contiene productos" });
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Insertar pedido principal
    const [pedidoResult] = await connection.query(
      "INSERT INTO webpedidos (cliente_nombre, cliente_contacto, total, observaciones) VALUES (?, ?, ?, ?)",
      [cliente_nombre || null, cliente_contacto || null, total || 0, observaciones || null]
    );

    const pedidoId = pedidoResult.insertId;

    // Insertar los productos del pedido
    for (const prod of productos) {
      await connection.query(
        "INSERT INTO webpedidos_detalle (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
        [pedidoId, prod.id, prod.cantidad || 1, prod.price || 0]
      );
    }

    await connection.commit();

    res.status(201).json({ success: true, pedido_id: pedidoId });
  } catch (err) {
    await connection.rollback();
    console.error("❌ Error al crear pedido:", err.message);
    res.status(500).json({ error: "Error al crear pedido" });
  } finally {
    connection.release();
  }
};

// 📦 Obtener todos los pedidos con sus productos
export const obtenerPedidos = async (req, res) => {
  try {
    const [pedidos] = await db.query("SELECT * FROM webpedidos ORDER BY fecha DESC");

    for (const pedido of pedidos) {
      const [productos] = await db.query(
        `SELECT d.id, d.producto_id, p.name, d.cantidad, d.precio_unitario
         FROM webpedidos_detalle d
         JOIN productos_test p ON d.producto_id = p.id
         WHERE d.pedido_id = ?`,
        [pedido.id]
      );
      pedido.productos = productos;
    }

    res.json(pedidos);
  } catch (err) {
    console.error("❌ Error al obtener pedidos:", err.message);
    res.status(500).json({ error: "Error al obtener pedidos" });
  }
};
