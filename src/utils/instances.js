import ProductManager from "../controllers/DAO/service/products.service.js";

import cartManagers from "../controllers/DAO/service/cart.service.js";
export const productList = new ProductManager();
export const cartList = new cartManagers();