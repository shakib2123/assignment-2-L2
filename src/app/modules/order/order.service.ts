import { TOrder } from './order.interface';
import { Order } from './order.model';

// Creates a new order in the database
const createOrderIntoDB = async (payload: TOrder): Promise<TOrder> => {
  const result = await Order.create(payload);
  return result;
};

// Fetches all orders from the database
const getAllOrdersFromDB = async (query: TOrder): Promise<TOrder[]> => {
  const result = await Order.find(query);
  return result;
};

//Exports the order services
export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
