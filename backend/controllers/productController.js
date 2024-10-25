const Product = require('../models/ProductModel')
const mongoose = require('mongoose')

//Create product
const createProduct = async (req, res) => {
    const {title, price, quantity, details, sold, status} = req.body
    const image = req.file ? req.file.filename : null;

    try{
        const product = await Product.create({title, price, quantity, details, sold, status, image})
        res.status(200).json(product)
    }catch (error)
    {
        res.status(400).json({error: error.message})
    }
}

//Select all product
const allProduct = async (req, res) => {
    const product = await Product.find({}).sort({createdAt: -1})
    res.status(200).json(product)  
}

//Select specific product
const selectProduct = async (req, res) => {
    const { id }  = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such product'})
    }
     const product = await Product.findById(id)
    if(!product){
        return res.status(400).json({error: 'No such product'})
    }else{
        res.status(200).json(product)
    }
}

//Delete product
const deleteProduct = async (req, res) => {
    const { id }  = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such product'})
    }
     const product = await Product.findOneAndDelete({_id: id})
    if(!product){
        return res.status(400).json({error: 'No such product'})
    }else{
        res.status(200).json(product)
    }
}

//Update product
const updateProduct = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such product'})
     }

     const updateFields = {
        title: req.body.title,
        price: req.body.price,
        quantity: req.body.quantity,
        details: req.body.details,
        sold: req.body.sold,
        status: req.body.status
    };

    if (req.file) {
        updateFields.image = req.file.filename; 
    }

    const product = await Product.findOneAndUpdate(
        { _id: id },
        { $set: updateFields }, 
        { new: true } 
    );

     if (!product){
        return res.status(404).json({error: 'No such product'})
     }

    res.status(200).json(product)
}

const topSelling = async (req, res) => {
    
    const product = await Product.find().sort({ sold: -1 }).limit(1);
    if(product.length === 0){
        res.status(404).json({error: 'There is no exisiting top product'})
    }

    res.status(200).json(product[0])
}

module.exports = {
    createProduct,
    allProduct,
    selectProduct,
    deleteProduct,
    updateProduct,
    topSelling
}