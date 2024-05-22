import express from "express";
import { ProductsController } from "./products.controller";

// call router from express
const router = express.Router();

// making routes
router.post("/products", ProductsController.createProduct);
router.get("/products", ProductsController.getProduct);
router.get("/products/:productId", ProductsController.getProductById);

export const ProductsRoutes = router;
