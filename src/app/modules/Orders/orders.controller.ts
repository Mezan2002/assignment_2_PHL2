import { NextFunction, Request, Response } from "express";
import { OrdersService } from "./order.service";
import { productModel } from "../products/products.model";
import { OrdersValidationSchema } from "./orders.validation";
import mongoose from "mongoose";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { order } = req.body;
    // parsing data by using zod
    const ordersParsedData = OrdersValidationSchema.parse(order);
    // storing data in DB
    const result = await OrdersService.createOrderIntoDB(ordersParsedData);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.query;

    const result = await OrdersService.getOrdersFromDB(
      (email as string) || null
    );
    res.status(200).json({
      success: result === null ? false : true,
      message:
        result === null ? "Order not found" : "Orders fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const OrdersController = {
  createOrder,
  getOrders,
};
