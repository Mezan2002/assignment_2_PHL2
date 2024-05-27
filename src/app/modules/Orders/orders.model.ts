import mongoose, { Schema, model } from "mongoose";
import { Orders } from "./orders.interface";
import { productModel } from "../products/products.model";

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

// Define the pre-save middleware
orderSchema.pre("save", async function (next) {
  try {
    // Check if the product ID is valid
    const isValidOrderId = mongoose.Types.ObjectId.isValid(this.productId);
    if (!isValidOrderId) {
      throw new Error("Invalid product ID. Please provide a valid product ID.");
    }

    // Fetch the product for validation of quantity
    const product = await productModel.findById(this.productId);

    // If product is not found, handle the case
    if (!product) {
      throw new Error("Product not found with the given ID.");
    }

    // If order quantity is greater than product quantity
    if (this.quantity > (product?.inventory?.quantity || 0)) {
      throw new Error("Insufficient quantity available in inventory");
    }

    // Update product quantity and inStock
    const newQuantity = product.inventory.quantity - this.quantity;
    const updatedProductData = {
      "inventory.quantity": newQuantity,
      "inventory.inStock": newQuantity > 0,
    };

    // Update the product in the database
    await productModel.findByIdAndUpdate(this.productId, {
      $set: updatedProductData,
    });

    // Continue with saving the order
    next();
  } catch (err: any) {
    // Handle any errors
    next(err);
  }
});

// order model
export const orderModel = model<Orders>("Order", orderSchema);
