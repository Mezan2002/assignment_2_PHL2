import { Request, Response } from "express";
import { OrdersService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const result = await OrdersService.createOrderIntoDB(order);
    res.status(200).json({
      success: result === null ? false : true,
      message:
        result === null
          ? "Invalid product ID, please try with a valid product ID to create a new order!"
          : "Order created successfully!",
      data: result === null ? null : result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const result = await OrdersService.getOrdersFromDB(
      (email as string) || null
    );
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const getOrderByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const result = await OrdersService.getOrderByEmailFromDB(email as string);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully for user email!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

export const OrdersController = {
  createOrder,
  getOrders,
};
