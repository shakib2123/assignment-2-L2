"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
/**
 * Product Routes
 *
 * This module defines the routes for the products.
 */
const router = express_1.default.Router();
// Create a new product in the database
router.post('/', product_controller_1.ProductControllers.createProduct);
// Get all products from the database
router.get('/', product_controller_1.ProductControllers.getAllProducts);
//Get a single product from the database with the given id
router.get('/:productId', product_controller_1.ProductControllers.getSingleProduct);
// Update a product in the database with the given id
router.put('/:productId', product_controller_1.ProductControllers.updateProduct);
// Delete a product from the database with the given id
router.delete('/:productId', product_controller_1.ProductControllers.deleteProduct);
exports.ProductRoutes = router;
