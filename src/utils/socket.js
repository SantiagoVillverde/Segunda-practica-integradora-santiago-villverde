
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { productList } from './instances.js';
import { menssagerModel } from '../controllers/models/menssage.model.js';
import { cartList } from './instances.js';
import cartModel from '../controllers/models/carts.model.js';
export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);




io.on('connection', async (socket) => {
	console.log('Cliente conectado');


	try {
		socket.emit("products", await productList.getProducts());
	} catch (error) {
		console.log(error);
	}


	try {
		const cart = await cartList.addCart()
		socket.emit('cartId', cart._id)

	} catch (err) {
		console.error('Error al crear el carrito:', err);
	}




	socket.on('agregarProducto', async ({ cartId, productId }) => {
		try {

			console.log(cartId, productId)

			await cartList.addProductCart(cartId, productId);
			let cart = await cartList.getCartId(cartId);

			const userCard = await cartModel.findById(cart._id).lean()


			socket.emit('cartproducts', { userCard });
		} catch (error) {
			console.log(error)
		}
	});




	socket.on('enviarCarrito', async (data) => {
		try {
			console.log(data)
			const cartUser = await cartList.getCartId(data.cartIdd)
			console.log(cartUser)
			socket.emit('cartUser', { cartUser })
		} catch (error) {
			console.log(error);
		}
	});


	try {
		const messages = await menssagerModel.find({}).lean();
		socket.emit('List-Message', { messages });
	} catch (error) {
		console.error('Error al obtener los mensajes:', error);
	}


	socket.on('disconnect', () => {
		console.log('Cliente desconectado');
	});
});
