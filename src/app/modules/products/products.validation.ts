import { z } from "zod";

const productValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  category: z.string().min(1, { message: "Category is required" }),
  tags: z
    .array(z.string().min(1, { message: "Tag cannot be empty" }))
    .min(1, { message: "At least one tag is required" }),
  variants: z
    .array(
      z.object({
        type: z.string().min(1, { message: "Variant type is required" }),
        value: z.string().min(1, { message: "Variant value is required" }),
      })
    )
    .min(1, { message: "At least one variant is required" }),
  inventory: z.object({
    quantity: z
      .number()
      .int()
      .nonnegative({ message: "Quantity must be a non-negative integer" }),
    inStock: z.boolean({ message: "In-stock status is required" }),
  }),
});

export default productValidationSchema;
