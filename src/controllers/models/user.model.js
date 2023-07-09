import mongoose from "mongoose";
import cartModel from "./carts.model.js";

const userSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: {
		type: String,
		unique: true,
		required: true,
		index: true,
	},
	password: String,
	cart: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: cartModel
			}
		],
		default: [],
	},
	rol: {
		type: String,
		default: 'USER'
	},
	img: String,
});

const userModel = mongoose.model('users', userSchema);

export default userModel;