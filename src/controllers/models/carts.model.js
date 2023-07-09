import mongoose from 'mongoose';
import  productModel  from './product.model.js';

const cartSchema = new mongoose.Schema({
   
    products: [
        {
         product: { type: mongoose.Schema.Types.ObjectId, ref: productModel } ,
         quantity: { type: Number },
        },
    ]

});


const cartModel = mongoose.model('carts', cartSchema);

export default cartModel;