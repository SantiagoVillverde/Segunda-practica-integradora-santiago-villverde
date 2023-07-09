
import {  promises } from 'fs';
import { nanoid } from 'nanoid';

export default class ProductManager {


    constructor() {
        this.products = [];

        this.producto = {
            id: 0,
            title: '',
            descripcion: '',
            price: '',
            code: '',
            stock: 0
        };
    }



    async addProducts(product) {

        if (product.title != '' && product.descripcion != '' && product.price != '' && product.thumbnail != '' && product.code != '') {


            let todosLosProductos = JSON.parse(await promises.readFile('./src/models/products.json', 'utf-8'))

            product.id = nanoid();
            this.producto.title = product.title;
            this.producto.descripcion = product.descripcion;
            this.producto.price = product.price;
            this.producto.code = product.code;
            this.producto.stock = product.stock;

            const validacion = todosLosProductos.filter(vali => vali.code === product.code)

            if (validacion.length > 0) {
                console.log("No puedes agregar mas de este articulo")
                return;
            }

            const carrito = [...todosLosProductos, product]
            console.log(`El producto: ${product.title}, "Ha sido agregado.`);
            writeFileSync('./src/models/products.json', JSON.stringify(carrito));

        } else (console.log("Todos los campos deben estar llenos"))


    }


    async updateProduct(id, productActualizado) {

        try {
            console.log(id, productActualizado )
            const todosLosProductos = JSON.parse(await promises.readFile('./src/models/products.json', 'utf-8'));

            const productoBuscado = todosLosProductos.findIndex((prod) => prod.id === id);
            todosLosProductos[productoBuscado] = productActualizado

            const newProducts = todosLosProductos.filter((prod) => prod.id !== productoBuscado.id);
            newProducts.push(productoBuscado);
            writeFileSync('./src/models/products.json', JSON.stringify(newProducts))
            console.log("El producto", productActualizado.title, "Ha sido actualizado")   
        }
        catch (error) {
            console.log("No se actualizo el producto")
        }

    }

    async getProducts() {
        try {
            const todosLosProductos = await promises.readFile('./src/models/products.json', 'utf-8');
            return JSON.parse(todosLosProductos);
        }
        catch (error) {
            console.log("No puedo ver el carrito de productos")
        }
    }

    async getProductsById(id) {

        try {
            let todosLosProductos = JSON.parse(await promises.readFile('./src/models/products.json', 'utf-8'));
            let filtro = await todosLosProductos.find((prod) => prod.id === id);
            if (filtro != null || filtro != undefined) {
                console.log("Producto encontrado", filtro)
                return filtro
            } else {
                console.log("Producto id: ", id, " no encontrado.")
            }
        }
        catch (error) {
            console.log("error :", error)
        }
    }


    async deleteProduct(id) {

        try {
            const todosLosProductos = JSON.parse(await promises.readFile('./src/models/products.json', 'utf-8'));
            const newProducts = todosLosProductos.filter((prod) => prod.id !== id);
            promises.writeFile('./src/models/products.json', JSON.stringify(newProducts))

            return console.log("El producto con el id: ", id, "Ha sido eliminado.");
        }
        catch (error) {
            console.log("NO SE PUEDE ELIMINAR EL PRODUCTO")
        }
    }

}


