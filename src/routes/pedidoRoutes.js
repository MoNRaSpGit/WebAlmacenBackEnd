import express from "express";
import { crearPedido, obtenerPedidos } from "../controllers/pedidoController.js";

const router = express.Router();

// Crear nuevo pedido
router.post("/", crearPedido);

// Obtener todos los pedidos con sus productos
router.get("/", obtenerPedidos);

export default router;
