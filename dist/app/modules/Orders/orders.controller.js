"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const order_service_1 = require("./order.service");
const products_model_1 = require("../products.model");
const orders_validation_1 = require("./orders.validation");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order } = req.body;
        // parsing data by using zod
        const ordersParsedData = orders_validation_1.OrdersValidationSchema.parse(order);
        const result = yield order_service_1.OrdersService.createOrderIntoDB(ordersParsedData);
        if (result !== null) {
            const product = yield products_model_1.productModel.findById(order.productId);
            if (product && product.inventory && product.inventory.quantity > 0) {
                const newQuantity = product.inventory.quantity - order.quantity;
                const updatedProductData = {
                    "inventory.quantity": newQuantity,
                    "inventory.inStock": newQuantity > 0,
                };
                const reduceOrderedProductQuantity = yield products_model_1.productModel.findByIdAndUpdate(order.productId, { $set: updatedProductData }, { new: true });
                res.status(200).json({
                    success: true,
                    message: "Order created successfully!",
                    data: result,
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Insufficient quantity available in inventory",
                    data: null,
                });
            }
        }
        else {
            res.status(400).json({
                success: false,
                message: "Invalid product ID, please try with a valid product ID to create a new order!",
                data: null,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const result = yield order_service_1.OrdersService.getOrdersFromDB(email || null);
        res.status(200).json({
            success: result === null ? false : true,
            message: result === null ? "Order not found" : "Orders fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err,
        });
    }
});
exports.OrdersController = {
    createOrder,
    getOrders,
};
