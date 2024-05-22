import { productModel } from "../products.model";
import { Product } from "./products.interface";

const createProductIntoDB = async (product: Product) => {
  const result = await productModel.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await productModel.find();
  return result;
};

export const ProductsService = { createProductIntoDB, getAllProductsFromDB };
