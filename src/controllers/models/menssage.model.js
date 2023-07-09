import mongoose from 'mongoose';



const menssageSchema = new mongoose.Schema({
    user: String,
    menssage: String
  });
  
  export const menssagerModel = mongoose.model('menssage', menssageSchema);
