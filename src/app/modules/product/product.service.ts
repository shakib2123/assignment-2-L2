import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};
const getAllProductFromDB = async (query: any) => {
  const result = await Product.find(query);
  return result;
};
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};
const updateProductFromDB = async (id: string, payload: TProduct) => {
  const updateData = payload;
  const result = await Product.findByIdAndUpdate(
    { _id: id },
    { $set: updateData },
    {
      new: true,
    },
  );
  return result;
};
const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete({ _id: id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
