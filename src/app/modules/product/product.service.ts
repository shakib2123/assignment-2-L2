import { TProduct } from './product.interface';
import { Product } from './product.model';

//Creates a new product in the database
const createProductIntoDB = async (payload: TProduct): Promise<TProduct> => {
  const result = await Product.create(payload);
  return result;
};
// Fetches all products from the database
const getAllProductFromDB = async (
  query: object,
): Promise<TProduct[] | null> => {
  const result = await Product.find(query);
  return result;
};
//Retrieves a single product from the database with the given id
const getSingleProductFromDB = async (id: string): Promise<TProduct | null> => {
  const result = await Product.findOne({ _id: id });
  return result;
};
//Updates a product in the database with the given id and updated data
const updateProductFromDB = async (
  id: string,
  payload: TProduct,
): Promise<TProduct | null> => {
  const updateData = payload;
  const result = await Product.findByIdAndUpdate(
    // Filter the product with the given id
    { _id: id },
    // Update the product with the given data
    { $set: updateData },
    // Return the updated product
    { new: true },
  );
  return result;
};
// Deletes a product from the database with the given id
const deleteProductFromDB = async (id: string): Promise<TProduct | null> => {
  const result = await Product.findByIdAndDelete({ _id: id });
  // Return the deleted product if found, otherwise null
  return result;
};

//export the product services
export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
