import { ObjectId } from "mongodb";
import { productModel } from "./products.model";
import { Product } from "./products.interface";

// create a new product
const createProductIntoDB = async (product: Product) => {
  const result = await productModel.create(product);
  return result;
};

// get all products
const getAllProductsFromDB = async (search: string | null) => {
  if (search) {
    const regex = new RegExp(search, "i");
    const results = await productModel.find({
      $or: [{ name: regex }, { description: regex }, { category: regex }],
    });
    return results;
  }
  const result = await productModel.find();
  return result;
};

// get single product by id
const getProductByIdFromDB = async (productId: string) => {
  const result = await productModel.findById(productId);
  return result;
};

const updateProductIntoDB = async (
  productId: string,
  updatedProductData: {}
) => {
  const result = await productModel.findByIdAndUpdate(
    productId,
    updatedProductData,
    { new: true }
  );
  return result;
};

const deleteProductFromDB = async (productId: string) => {
  const ifProductExists = await productModel.findById(productId);
  if (ifProductExists) {
    const result = await productModel.findByIdAndDelete(productId);
    return null;
  }
  const message = "Product not exists in database!";
  return message;
};

export const ProductsService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
