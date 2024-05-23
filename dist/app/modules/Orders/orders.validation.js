"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersValidationSchema = void 0;
const zod_1 = require("zod");
exports.OrdersValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: zod_1.z.string().min(1, { message: "productId is required" }),
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().int().positive(),
});
