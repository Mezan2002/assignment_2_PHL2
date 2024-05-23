import { Request, Response } from "express";
import { OrdersService } from "./order.service";
import { productModel } from "../products.model";
import { OrdersValidationSchema } from "./orders.validation";
import mongoose from "mongoose";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    // checking id is valid order id or not
    const isValidOrderId = mongoose.Types.ObjectId.isValid(order.productId);

    if (isValidOrderId) {
      // taking product for validation of quantity
      const product = await productModel.findById(order.productId);
      // if order quantity is greater than product quantity
      if (order.quantity > (product?.inventory?.quantity as number)) {
        res.status(400).json({
          success: false,
          message: "Insufficient quantity available in inventory",
          data: null,
        });
      } else {
        // if product is available and quantity is greater than 0
        if (product && product.inventory && product.inventory.quantity > 0) {
          const newQuantity = product.inventory.quantity - order.quantity;
          const updatedProductData = {
            "inventory.quantity": newQuantity,
            "inventory.inStock": newQuantity > 0,
          };
          // update prodcut quantity and inStock
          const reduceOrderedProductQuantity =
            await productModel.findByIdAndUpdate(
              order.productId,
              { $set: updatedProductData },
              { new: true }
            );

          // parsing data by using zod
          const ordersParsedData = OrdersValidationSchema.parse(order);
          // storing data in DB
          const result = await OrdersService.createOrderIntoDB(
            ordersParsedData
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
