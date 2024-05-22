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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
//Create a new product in the database
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the product data using Zod
        const zodParsedData = product_validation_1.productValidationSchema.parse(req.body);
        // Create the product in the database
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodParsedData);
        // Return the created product in the response
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (error) {
        // If the error is a Zod validation error, return the error with a 500 status code
        if (error.issues && error.issues.length > 0 && error.issues[0].message) {
            res.status(500).json({
                success: false,
                message: error.issues[0].message || 'Something went wrong',
                error: error,
            });
        }
        else {
            // Otherwise, return the error with a 500 status code
            res.status(500).json({
                success: false,
                message: (error === null || error === void 0 ? void 0 : error.message) || 'Something went wrong',
                error: error,
            });
        }
    }
});
// Fetch all products from the database
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const query = {};
        // If the search term is provided, create a query to search for products
        // based on their name, category, and description
        if (searchTerm) {
            query.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
            ];
        }
        // Fetch all products from the database
        const result = yield product_service_1.ProductServices.getAllProductFromDB(query);
        // If no products are found, return a 404 status code
        if (!result || result.length === 0) {
            res.status(404).json({ success: false, message: 'Product not found' });
            return;
        }
        // If no search term is provided, return all products
        if (!searchTerm) {
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
                data: result,
            });
        }
        else {
            // Otherwise, return the products matching the search term
            res.status(200).json({
                success: true,
                message: `Products matching search term '${searchTerm}' fetched successfully!`,
                data: result,
            });
        }
    }
    catch (error) {
        // If an error occurs, return a 500 status code
        res.status(500).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || 'Something went wrong',
            error: error,
        });
    }
});
// Get a single product by id from the database
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        // Fetch the product with the given id from the database
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(id);
        if (!result) {
            // If the product is not found, return a 404 status code
            res.status(404).json({ success: false, message: 'Product not found' });
            return;
        }
        // If the product is found, return it in the response
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        // If an error occurs, return a 500 status code
        res.status(500).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || 'Something went wrong',
            error: error,
        });
    }
});
//Updates a product in the database with the given id and updated data
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const updatedData = req.body;
        const zodParsedData = product_validation_1.productValidationSchema.parse(updatedData);
        // Update the product in the database with the given id and updated data
        const result = yield product_service_1.ProductServices.updateProductFromDB(id, zodParsedData);
        if (!result) {
            // If the product is not found, return a 404 status code
            res.status(404).json({ success: false, message: 'Product not found' });
            return;
        }
        // Return the updated product in the response
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: result,
        });
    }
    catch (error) {
        if (error.issues && error.issues.length > 0 && error.issues[0].message) {
            // If the error is a Zod validation error, return the error with a 500 status code
            res.status(500).json({
                success: false,
                message: error.issues[0].message || 'Something went wrong',
                error: error,
            });
        }
        else {
            // Otherwise, return the error with a 500 status code
            res.status(500).json({
                success: false,
                message: (error === null || error === void 0 ? void 0 : error.message) || 'Something went wrong',
                error: error,
            });
        }
    }
});
//Delete a product from the database with the given id
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        // Delete the product from the database with the given id
        const result = yield product_service_1.ProductServices.deleteProductFromDB(id);
        if (!result) {
            // If the product is not found, return a 404 status code
            res.status(404).json({ success: false, message: 'Product not found' });
            return;
        }
        // Return a 200 status code and a success message
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
        });
    }
    catch (error) {
        // If an error occurs, return a 500 status code and a success message
        res.status(500).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || 'Something went wrong',
            error: error,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
