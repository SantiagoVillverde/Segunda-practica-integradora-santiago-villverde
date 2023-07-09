import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'


const productSchema = new mongoose.Schema({
    title: String,
    descripcion: String,
    thumbnail: String,
    price: Number,
    code: {
        type: String,
        unique: true,
    },
    stock: Number
});
productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model('products', productSchema); 
export default productModel