"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const products_route_1 = require("./app/modules/products/products.route");
const orders_route_1 = require("./app/modules/Orders/orders.route");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// api routes
app.use("/api", products_route_1.ProductsRoutes);
app.use("/api", orders_route_1.OrdersRoutes);
// no route error (404 Not Found)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
// error handling middleware (for other types of errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});
// home route
app.get("/", (req, res) => {
    res.send("Hurrah! Ecommerce server is running...");
});
exports.default = app;
