import express from 'express';
import { ProductControllers } from './product.controller';

/**
 * Product Routes
 *
 * This module defines the routes for the products.
 */
const router = express.Router();

// Create a new product in the database
router.post('/', ProductControllers.createProduct);

// Get all products from the database
router.get('/', ProductControllers.getAllProducts);

//Get a single product from the database with the given id
router.get('/:productId', ProductControllers.getSingleProduct);

// Update a product in the database with the given id
router.put('/:productId', ProductControllers.updateProduct);

// Delete a product from the database with the given id
router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
