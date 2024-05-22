"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
/**
 * Order Routes
 *
 * This module defines the routes for the orders.
 */
const router = express_1.default.Router();
//Create a new order
router.post('/', order_controller_1.OrderControllers.createOrder);
// Get all orders
router.get('/', order_controller_1.OrderControllers.getAllOrders);
//Export the Order Routes
exports.OrderRoutes = router;
