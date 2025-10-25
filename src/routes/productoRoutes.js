import express from "express";
import { getProductos, getProductoById } from "../controllers/productoController.js";

const router = express.Router();

// GET /api/productos
router.get("/", getProductos);

// GET /api/productos/:id
router.get("/:id", getProductoById);

export default router;
