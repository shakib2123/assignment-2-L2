import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { productValidationSchema } from './product.validation';

//Create a new product in the database
const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate the product data using Zod
    const zodParsedData = productValidationSchema.parse(req.body);

    // Create the product in the database
    const result = await ProductServices.createProductIntoDB(zodParsedData);

    // Return the created product in the response
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error: any) {
    // If the error is a Zod validation error, return the error with a 500 status code
    if (error.issues && error.issues.length > 0 && error.issues[0].message) {
      res.status(500).json({
        success: false,
        message: error.issues[0].message || 'Something went wrong',
        error: error,
      });
    } else {
      // Otherwise, return the error with a 500 status code
      res.status(500).json({
        success: false,
        message: error?.message || 'Something went wrong',
        error: error,
      });
    }
  }
};

// Fetch all products from the database
const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchTerm = req.query.searchTerm;
    const query: any = {};

    // If the search term is provided, create a query to search for products
    // based on their name, category, and description
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    // Fetch all products from the database
    const result = await ProductServices.getAllProductFromDB(query);

    // If no products are found, return a 404 status code
    if (!result || result.length === 0) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    // If no search term is provided, return all products
    if (!searchTerm) {
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    } else {
      // Otherwise, return the products matching the search term
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    }
  } catch (error: any) {
    // If an error occurs, return a 500 status code
    res.status(500).json({
      success: false,
      message: error?.message || 'Something went wrong',
      error: error,
    });
  }
};
// Get a single product by id from the database

const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.productId;
    // Fetch the product with the given id from the database
    const result = await ProductServices.getSingleProductFromDB(id);

    if (!result) {
      // If the product is not found, return a 404 status code
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    // If the product is found, return it in the response
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    // If an error occurs, return a 500 status code
    res.status(500).json({
      success: false,
      message: error?.message || 'Something went wrong',
      error: error,
    });
  }
};

//Updates a product in the database with the given id and updated data
const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.productId;
    const updatedData = req.body;
    const zodParsedData = productValidationSchema.parse(updatedData);

    // Update the product in the database with the given id and updated data
    const result = await ProductServices.updateProductFromDB(id, zodParsedData);

    if (!result) {
      // If the product is not found, return a 404 status code
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    // Return the updated product in the response
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error: any) {
    if (error.issues && error.issues.length > 0 && error.issues[0].message) {
      // If the error is a Zod validation error, return the error with a 500 status code
      res.status(500).json({
        success: false,
        message: error.issues[0].message || 'Something went wrong',
        error: error,
      });
    } else {
      // Otherwise, return the error with a 500 status code
      res.status(500).json({
        success: false,
        message: error?.message || 'Something went wrong',
        error: error,
      });
    }
  }
};
//Delete a product from the database with the given id
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.productId;

    // Delete the product from the database with the given id
    const result = await ProductServices.deleteProductFromDB(id);

    if (!result) {
      // If the product is not found, return a 404 status code
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    // Return a 200 status code and a success message
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    // If an error occurs, return a 500 status code and a success message
    res.status(500).json({
      success: false,
      message: error?.message || 'Something went wrong',
      error: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
