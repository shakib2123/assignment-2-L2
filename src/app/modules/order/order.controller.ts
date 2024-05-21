import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { orderValidationSchema } from './order.validation';
import { Product } from '../product/product.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const product = await Product.findById(payload.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    // Check if the ordered quantity exceeds the available quantity
    if (
      product.inventory.quantity < payload.quantity ||
      !product.inventory.inStock
    ) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }
    // Update the inventory quantity and inStock status
    product.inventory.quantity -= payload.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();

    const zodParsedData = orderValidationSchema.parse(payload);
    const result = await OrderServices.createOrderIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    if (error.issues && error.issues.length > 0 && error.issues[0].message) {
      res.status(500).json({
        success: false,
        message: error.issues[0].message || 'Something went wrong',
        error: error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: error?.message || 'Something went wrong',
        error: error,
      });
    }
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    let query: any = {};

    if (email) {
      query = { email };
    }
    const result = await OrderServices.getAllOrdersFromDB(query);

    if (!result || result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found' });
    }

    if (!email) {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Orders fetched successfully for ${email}!`,
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'Something went wrong',
      error: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
