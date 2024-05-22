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
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = require("./order.validation");
const product_model_1 = require("../product/product.model");
//Create a new order in the database
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        // Find the product with the given id
        const product = yield product_model_1.Product.findById(payload.productId);
        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
            return;
        }
        // Check if the ordered quantity exceeds the available quantity
        if (product.inventory.quantity < payload.quantity ||
            !product.inventory.inStock) {
            res.status(400).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
            return;
        }
        // Update the inventory quantity and inStock status
        product.inventory.quantity -= payload.quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        yield product.save();
        // Validate the order data using Zod
        const zodParsedData = order_validation_1.orderValidationSchema.parse(payload);
        // Create the order in the database
        const result = yield order_service_1.OrderServices.createOrderIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (error) {
        if (error.issues && error.issues.length > 0 && error.issues[0].message) {
            res.status(500).json({
                success: false,
                message: error.issues[0].message || 'Something went wrong',
                error: error,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: (error === null || error === void 0 ? void 0 : error.message) || 'Something went wrong',
                error: error,
            });
        }
    }
});
//Fetch all orders from the database
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // The query to filter orders by email
        let query = {};
        //The email to filter orders by
        const email = req.query.email;
        if (email) {
            query = { email };
        }
        // Fetch all orders from the database
        const result = yield order_service_1.OrderServices.getAllOrdersFromDB(query);
        if (!result || result.length === 0) {
            res.status(404).json({ success: false, message: 'Order not found' });
            return;
        }
        if (!email) {
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully!',
                data: result,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: `Orders fetched successfully for ${email}!`,
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || 'Something went wrong',
            error: error,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
};
