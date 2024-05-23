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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orders_model_1 = require("../orders.model");
const createOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidOrderId = mongoose_1.default.Types.ObjectId.isValid(order.productId);
    if (!isValidOrderId) {
        return null;
    }
    const result = yield orders_model_1.orderModel.create(order);
    return result;
});
const getOrdersFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        const result = yield orders_model_1.orderModel.find({ email });
        if (result && result.length > 0) {
            return result;
        }
        else {
            return null;
        }
    }
    const result = yield orders_model_1.orderModel.find();
    return result;
});
exports.OrdersService = {
    createOrderIntoDB,
    getOrdersFromDB,
};
