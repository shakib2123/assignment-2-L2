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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
//Creates a new product in the database
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(payload);
    return result;
});
// Fetches all products from the database
const getAllProductFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find(query);
    return result;
});
//Retrieves a single product from the database with the given id
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ _id: id });
    return result;
});
//Updates a product in the database with the given id and updated data
const updateProductFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = payload;
    const result = yield product_model_1.Product.findByIdAndUpdate(
    // Filter the product with the given id
    { _id: id }, 
    // Update the product with the given data
    { $set: updateData }, 
    // Return the updated product
    { new: true });
    return result;
});
// Deletes a product from the database with the given id
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete({ _id: id });
    // Return the deleted product if found, otherwise null
    return result;
});
//export the product services
exports.ProductServices = {
    createProductIntoDB,
    getAllProductFromDB,
    getSingleProductFromDB,
    updateProductFromDB,
    deleteProductFromDB,
};
