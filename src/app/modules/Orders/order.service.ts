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

const getOrdersFromDB = async (email: string | null) => {
  if (email) {
    const result = await orderModel.find({ email });
    return result;
  }
  const result = await orderModel.find();
  return result;
};

const getOrderByEmailFromDB = async (email: string) => {
  const result = await orderModel.find({ email });
  return result;
};

export const OrdersService = {
  createOrderIntoDB,
  getOrdersFromDB,
  getOrderByEmailFromDB,
};
