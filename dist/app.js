"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Main application file
 */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/product/product.route");
const order_route_1 = require("./app/modules/order/order.route");
//Create the Express.js application
const app = (0, express_1.default)();
// Set up the middleware for the application
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Set up the routes for the application
app.use('/api/products', product_route_1.ProductRoutes);
app.use('/api/orders', order_route_1.OrderRoutes);
//Handle the root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome To Ecommerce API Service!' });
});
//Handle any other route and return a 404 error
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found!',
        status: 404,
    });
});
//Export the application
exports.default = app;
