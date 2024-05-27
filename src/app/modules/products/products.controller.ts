import { NextFunction, Request, Response } from "express";
import { ProductsService } from "./products.service";
import productValidationSchema from "./products.validation";

// controllers for product

// create a new product
const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(err);
  }
};

// get all products
const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;
    const result = await ProductsService.getAllProductsFromDB(
      (search as string) || null
    );
    res.status(200).json({
      success: true,
      message: search
        ? `Products matching search term '${search}' fetched successfully!`
        : "Products fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

// get product by id
const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const result = await ProductsService.getProductByIdFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

// update a product
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(err);
  }
};

// delete a product
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const result = await ProductsService.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const ProductsController = {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
