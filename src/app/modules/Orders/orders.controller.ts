import { Request, Response } from "express";
import { OrdersService } from "./order.service";
import { productModel } from "../products.model";
import { OrdersValidationSchema } from "./orders.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    // parsing data by using zod
    const ordersParsedData = OrdersValidationSchema.parse(order);
    const result = await OrdersService.createOrderIntoDB(ordersParsedData);

    if (result !== null) {
      const product = await productModel.findById(order.productId);
      if (order.quantity > (product?.inventory?.quantity as number)) {
        res.status(400).json({
          success: false,
          message: "Insufficient quantity available in inventory",
          data: null,
        });
      }
      if (product && product.inventory && product.inventory.quantity > 0) {
        const newQuantity = product.inventory.quantity - order.quantity;
        const updatedProductData = {
          "inventory.quantity": newQuantity,
          "inventory.inStock": newQuantity > 0,
        };

        const reduceOrderedProductQuantity =
          await productModel.findByIdAndUpdate(
            order.productId,
            { $set: updatedProductData },
            { new: true }
          );

        res.status(200).json({
          success: true,
          message: "Order created successfully!",
          data: result,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Insufficient quantity available in inventory",
          data: null,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message:
          "Invalid product ID, please try with a valid product ID to create a new order!",
        data: null,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
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
      success: result === null ? false : true,
      message:
        result === null ? "Order not found" : "Orders fetched successfully!",
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
