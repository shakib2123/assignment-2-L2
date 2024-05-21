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

export const OrderControllers = {
  createOrder,
};
