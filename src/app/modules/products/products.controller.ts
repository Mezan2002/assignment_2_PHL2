import { Request, Response } from "express";
import { ProductsService } from "./products.service";
import productValidationSchema from "./products.validation";

// controllers for product

// create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    // parsing data by using zod
    const productsParsedData = productValidationSchema.parse(productData);
    const result = await ProductsService.createProductIntoDB(
      productsParsedData
    );
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

// get all products
const getProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductsService.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

// get product by id
const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductsService.getProductByIdFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedProductData = req.body;
    const result = await ProductsService.updateProductIntoDB(
      productId,
      updatedProductData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductsService.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

export const ProductsController = {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
