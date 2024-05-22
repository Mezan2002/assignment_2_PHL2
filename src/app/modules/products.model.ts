import { Schema, model } from "mongoose";
import { Product } from "./products/products.interface";

// schema for product
const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  variants: [
    {
      type: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
  inventory: {
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
});

// model for product
export const productModel = model<Product>("Product", productSchema);
