import { productModel } from "../products.model";
import { Product } from "./products.interface";

const createProductIntoDB = async (product: Product) => {
  const result = await productModel.create(product);
  return result;
};

export const ProductsService = { createProductIntoDB };
