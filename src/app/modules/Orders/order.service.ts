import mongoose from "mongoose";
import { orderModel } from "../orders.model";
import { Orders } from "./orders.interface";

const createOrderIntoDB = async (order: Orders) => {
  const result = await orderModel.create(order);
  return result;
};

const getOrdersFromDB = async (email: string | null) => {
  if (email) {
    const result = await orderModel.find({ email });
    if (result && result.length > 0) {
      return result;
    } else {
      return null;
    }
  }
  const result = await orderModel.find();
  return result;
};

export const OrdersService = {
  createOrderIntoDB,
  getOrdersFromDB,
};
