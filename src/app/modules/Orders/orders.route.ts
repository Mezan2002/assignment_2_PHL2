import express from "express";
import { OrdersController } from "./orders.controller";

// call router from express
const router = express.Router();

router.post("/orders", OrdersController.createOrder);
router.get("/orders", OrdersController.getOrders);

export const OrdersRoutes = router;
