import { Request, Response } from "express";
import { ProductsService } from "./products.service";

// controllers for product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    const result = await ProductsService.createProductIntoDB(productData);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const ProductsController = { createProduct };
