/**
 * Main application file
 */
import express from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';

//Create the Express.js application
const app = express();

// Set up the middleware for the application
app.use(express.json());
app.use(cors());

// Set up the routes for the application
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

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
export default app;
