import mongoose from "mongoose";
import Product from "../schema/product.schema.js";

export const createProduct = async (req, res) => {
    try {
        const {title, price} = req.body
        const parsedPrice = Number(price)
        if(typeof title !== 'string' || title.trim() === '' || isNaN(parsedPrice) || parsedPrice <= 0){
            return res.status(400).json({message: "Invalid product title or price"})
        }
        
        const product = new Product({title: title.trim(), price})
        await product.save()
        
        res.status(201).json({
            message: "Product created successfully",
            product
        })
        
    } catch (error) {
       res.status(500).json({message: error.message}) 
    }
}

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find()

         if(!products.length) return res.status(200).json({message: "No product found"})
            
         res.status(200).json(products)     

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getProductById = async (req, res) => {
    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "Invalid product ID"})
        }

        const product = await Product.findById(id)
        if(!product) return res.status(404).json({message: "Product not found"})

        res.status(200).json(product)    
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "Invalid product ID"})
        }

        const product = await Product.findByIdAndUpdate(id, req.body, {new: true})

         if(!product) return res.status(404).json({message: "Product not found"})

         res.status(200).json({
            message: "Product updated successfully",
            product
         })   

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "Invalid product ID"})
        }

        const product = await Product.findByIdAndDelete(id)

         if(!product) return res.status(404).json({message: "Product not found"})

         res.status(200).json({
            message: "Product deleted successfully",
            product
         })   

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

