import mongoose from "mongoose";
import { orderModel } from "../orders.model";
import { Orders } from "./orders.interface";

const createOrderIntoDB = async (order: Orders) => {
  const isValidOrderId = mongoose.Types.ObjectId.isValid(order.productId);
  if (!isValidOrderId) {
    return null;
  }
  const result = await orderModel.create(order);
  return result;
};

export const OrdersService = {
  createOrderIntoDB,
};
