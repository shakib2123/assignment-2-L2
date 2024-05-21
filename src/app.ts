import express from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app = express();

//parsers
app.use(express.json());
app.use(cors());

//routes
app.use('/api/products', ProductRoutes);

app.use('/api/orders', OrderRoutes);

app.get('/', (req, res) => {
  res.send('Assignment server is running!');
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found!',
    status: 404,
  });
});

export default app;
