"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    description: zod_1.z.string().min(1, { message: "Description is required" }),
    price: zod_1.z.number().positive({ message: "Price must be a positive number" }),
    category: zod_1.z.string().min(1, { message: "Category is required" }),
    tags: zod_1.z
        .array(zod_1.z.string().min(1, { message: "Tag cannot be empty" }))
        .min(1, { message: "At least one tag is required" }),
    variants: zod_1.z
        .array(zod_1.z.object({
        type: zod_1.z.string().min(1, { message: "Variant type is required" }),
        value: zod_1.z.string().min(1, { message: "Variant value is required" }),
    }))
        .min(1, { message: "At least one variant is required" }),
    inventory: zod_1.z.object({
        quantity: zod_1.z
            .number()
            .int()
            .nonnegative({ message: "Quantity must be a non-negative integer" }),
        inStock: zod_1.z.boolean({ message: "In-stock status is required" }),
    }),
});
exports.default = productValidationSchema;
