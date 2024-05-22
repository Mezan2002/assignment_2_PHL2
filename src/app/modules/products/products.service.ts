import { ObjectId } from "mongodb";
import { productModel } from "../products.model";
import { Product } from "./products.interface";

// create a new product
const createProductIntoDB = async (product: Product) => {
  const result = await productModel.create(product);
  return result;
};

// get all products
const getAllProductsFromDB = async () => {
  const result = await productModel.find();
  return result;
};

// get single product by id
const getProductByIdFromDB = async (productId: string) => {
  const result = await productModel.findById(productId);
  return result;
};

export const ProductsService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
};
