import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
})

const Product = model("Product", productSchema)

export default Product