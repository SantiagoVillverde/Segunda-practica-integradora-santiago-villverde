import fs from 'fs';
import { nanoid } from 'nanoid';
import ProductManager from './products.js';

const productToCart = new ProductManager();

export default class cartManagers {


    addCart = async () => {

        const cartsList = JSON.parse(await fs.promises.readFile('./src/models/carts.json', 'utf-8'))
        console.log(cartsList)
        const cart = {
            products: [],
        }
        cart.id = nanoid();
        cartsList.push(cart);
        console.log(cartsList)
        await fs.promises.writeFile('./src/models/carts.json', JSON.stringify(cartsList));
        return cartsList;
    }


    idToCart = async (id) => {
        const idCartsList = JSON.parse(await fs.promises.readFile('./src/models/carts.json', 'utf-8'))
        const filterCart = idCartsList.find((cart) => cart.id === id);
        if (filterCart === undefined) {
            return console.log("Carrito no existe")
        }
        return filterCart;
    }


    /** @param {number} id */
    #validIdCart = async (id) => {
        let carts = JSON.parse(await fs.promises.readFile('./src/models/carts.json', 'utf-8'));
        return carts.find((cart) => cart.id === id);
    };


    /** @param {number} id */
    #validIdProduct = async (id) => {
        let products = await productToCart.getProducts();
        return await products.find((product) => product.id === id);
    };



    addProductCart = async (cid, pid) => {
        console.log(cid, pid)

        let validCart = await this.#validIdCart(cid);
        if (validCart === false) {
            return 'Carrito no existe';
        }

        let validProduct = await this.#validIdProduct(pid);
        if (validProduct === false) {
            return 'Producto no encontrado';
        }

        const newListCart = JSON.parse(await fs.promises.readFile('./src/models/carts.json', 'utf-8'));

        let FilterCart = await newListCart.filter((cart) => cart.id != cid);
        if (validCart.products.some((product) => product.id === pid)) {
            let productExist = validCart.products.find(
                (product) => product.id === pid
            );

            productExist.quantity++;
            let newCarts = [validCart, ...FilterCart];

            await fs.promises.writeFile('./src/models/carts.json', JSON.stringify(newCarts));
            return 'Producto Agregado al Carrito';
        }
        validCart.products.push({ id: validProduct.id, quantity: 1 });
        let newCarts = [validCart, ...FilterCart];
        await fs.promises.writeFile('./src/models/carts.json', JSON.stringify(newCarts));;
        return 'Producto Agregado al Carrito';


    }

}