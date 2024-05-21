import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { orderValidationSchema } from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const zodParsedData = orderValidationSchema.parse(payload);
    const result = await OrderServices.createOrderIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.issues[0].message || 'Something went wrong',
      error: error,
    });
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
