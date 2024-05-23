"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("./products.controller");
// call router from express
const router = express_1.default.Router();
// making product routes
router.post("/products", products_controller_1.ProductsController.createProduct);
router.get("/products", products_controller_1.ProductsController.getProduct);
router.get("/products/:productId", products_controller_1.ProductsController.getProductById);
router.put("/products/:productId", products_controller_1.ProductsController.updateProduct);
router.delete("/products/:productId", products_controller_1.ProductsController.deleteProduct);
exports.ProductsRoutes = router;
