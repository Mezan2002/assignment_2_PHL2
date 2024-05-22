import { Schema, model } from "mongoose";
import { Orders } from "./Orders/orders.interface";

// order schema
const orderSchema = new Schema<Orders>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// order model
const orderModel = model<Orders>("Order", orderSchema);
