import express from "express";
import { ProductsController } from "./products.controller";

// call router from express
const router = express.Router();

// making routes
router.post("/products", ProductsController.createProduct);

export const ProductsRoutes = router;
