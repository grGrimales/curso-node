import mongoose, { Schema } from "mongoose";



const productSchema = new mongoose.Schema({


    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true
    },
    price: {
        type: Number,
        required: false,
        default: 0
    },
    description: {
        type: String,
        required: false
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    },


});


export const Product = mongoose.model('Product', productSchema);