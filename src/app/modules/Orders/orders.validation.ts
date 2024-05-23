import { z } from "zod";

export const OrdersValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string().min(1, { message: "productId is required" }),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});
