const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    sold: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Product', productSchema)

