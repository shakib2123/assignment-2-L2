# E-commerce API Application

## 🤖 Introduction

This project is an E-commerce API built with Express and TypeScript, integrated with MongoDB using Mongoose for effective data management. It ensures data integrity through validation using Zod.

## ⚙️ Tech Stack

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Zod](https://zod.dev/)

## 🔋 Features

### 1. Product Management

- 👉 **Create a New Product:** Implement an endpoint to add new products to the catalog with comprehensive details such as name, description, price, category, tags, variants, and inventory.
- 👉 **Retrieve All Products:** Implement an endpoint to fetch a list of all available products, providing detailed information for each product.
- 👉 **Retrieve Specific Product by ID:** Implement an endpoint to fetch detailed information about a specific product using its unique ID.
- 👉 **Update Product Information:** Implement an endpoint to update the details of an existing product, allowing changes to name, description, price, category, tags, variants, and inventory.
- 👉 **Delete a Product:** Implement an endpoint to remove a product from the catalog using its unique ID.
- 👉 **Search for Products:** Implement a search functionality to find products based on a search term, filtering by name, tags, or categories.

### 2. Order Management

- 👉 **Create a New Order:** Implement an endpoint to place new orders, including details such as user email, product ID, price, and quantity.
- 👉 **Retrieve All Orders:** Implement an endpoint to fetch all orders, providing details about each order.
- 👉 **Retrieve Orders by User Email:** Implement an endpoint to fetch orders based on the user's email, allowing users to view their order history.

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

- 🖥️ [**Node.js**](https://nodejs.org/en) installed on your machine (v14 or higher recommended)
- 🍃 [**MongoDB**](https://www.mongodb.com/) installed and running on your local machine or accessible through a cloud service
- ✏️ A code editor like [**VSCode**](https://code.visualstudio.com/)
- ✅ [**TypeScript**](https://www.typescriptlang.org/) installed
- ✅ [**npm**](https://www.npmjs.com/) installed

### 📂 Clone the Repository

```bash
git clone https://github.com/shakib2123/assignment-2-L2
cd assignment-2-L2
```

### 📦 Install Dependencies

```bash
npm install
```

### ⚙️ Configure Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```bash
PORT=5000
DB_URI="mongodb://localhost:27017/assignment-2"
```

### 🛠️ Compile TypeScript

```bash
npm run build
```

### 🚀 Start the Application

```bash
npm run start:dev
```

The server should be running on `http://localhost:5000`.

## 📌 Available API Endpoints

### 🛍️ Product Management

#### 1. Create a New Product

- **Endpoint:** `/api/products`
- **Method:** `POST`

#### 2. Retrieve All Products

- **Endpoint:** `/api/products`
- **Method:** `GET`

#### 3. Retrieve Specific Product by ID

- **Endpoint:** `/api/products/:productId`
- **Method:** `GET`

#### 4. Update Product Information

- **Endpoint:** `/api/products/:productId`
- **Method:** `PUT`

#### 5. Delete a Product

- **Endpoint:** `/api/products/:productId`
- **Method:** `DELETE`

#### 6. Search a Product

- **Endpoint:** `/api/products?searchTerm=iphone`
- **Method:** `GET`

### 🛒 Order Management

#### 1. Create a New Order

- **Endpoint**: `/api/orders`
- **Method**: `POST`

#### 2. Retrieve All Orders

- **Endpoint**: `/api/orders`
- **Method**: `GET`

#### 3. Retrieve Orders by User Email

- **Endpoint**: `/api/orders?email=level2@programming-hero.com`
- **Method**: `GET`

## ⚠️ Validation and Error Handling

The application uses Zod for validation of incoming data for product and order creation and updating operations. Validation errors and other errors are handled gracefully, providing meaningful error messages in the API responses.

## 🧹 Linting

Ensure the code adheres to a consistent style by running:

```bash
npm run lint
```

## 🧹 Linting Fix

Fix the code by running:

```bash
npm run lint:fix
```

## 🧹 Formatting

Format the code by running:

```bash
npm run prettier
```

## 📧 Contact

If you have any questions or need further assistance, please contact mshakibalhasan21@gmail.com.

---

By following these steps, you should be able to set up and run the E-commerce API application locally on your machine.
