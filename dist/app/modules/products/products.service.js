"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const products_model_1 = require("../products.model");
// create a new product
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.productModel.create(product);
    return result;
});
// get all products
const getAllProductsFromDB = (search) => __awaiter(void 0, void 0, void 0, function* () {
    if (search) {
        const regex = new RegExp(search, "i");
        const results = yield products_model_1.productModel.find({
            $or: [{ name: regex }, { description: regex }, { category: regex }],
        });
        return results;
    }
    const result = yield products_model_1.productModel.find();
    return result;
});
// get single product by id
const getProductByIdFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.productModel.findById(productId);
    return result;
});
const updateProductIntoDB = (productId, updatedProductData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.productModel.findByIdAndUpdate(productId, updatedProductData, { new: true });
    return result;
});
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const ifProductExists = yield products_model_1.productModel.findById(productId);
    if (ifProductExists) {
        const result = yield products_model_1.productModel.findByIdAndDelete(productId);
        return null;
    }
    const message = "Product not exists in database!";
    return message;
});
exports.ProductsService = {
    createProductIntoDB,
    getAllProductsFromDB,
    getProductByIdFromDB,
    updateProductIntoDB,
    deleteProductFromDB,
};
