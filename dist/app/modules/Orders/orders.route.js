"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("./orders.controller");
// call router from express
const router = express_1.default.Router();
router.post("/orders", orders_controller_1.OrdersController.createOrder);
router.get("/orders", orders_controller_1.OrdersController.getOrders);
exports.OrdersRoutes = router;
