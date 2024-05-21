import express from 'express';
import { OrderControllers } from './order.controller';

/**
 * Order Routes
 *
 * This module defines the routes for the orders.
 */
const router = express.Router();

//Create a new order
router.post('/', OrderControllers.createOrder);

// Get all orders
router.get('/', OrderControllers.getAllOrders);

//Export the Order Routes
export const OrderRoutes = router;
