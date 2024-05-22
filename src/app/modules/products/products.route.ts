import express from "express";
import { ProductsController } from "./products.controller";

// call router from express
const router = express.Router();

// making routes

// products routes
router.post("/products", ProductsController.createProduct);
router.get("/products", ProductsController.getProduct);
router.get("/products/:productId", ProductsController.getProductById);
router.put("/products/:productId", ProductsController.updateProduct);
router.delete("/products/:productId", ProductsController.deleteProduct);

// orders routes

export const ProductsRoutes = router;
