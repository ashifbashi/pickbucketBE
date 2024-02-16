const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
  
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor',
            required: true
        },
        deliveryDate: {
            type: String,
            required: true,
        },
        location: {
            type: String,
        },
        address: {
            type: String,
        },
        pincode: {
            type: String,
        },
        number: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            default: '1',
        },
        orderDate: {
            type: Date,
            default: new Date()
        }
    }],


})

const order = mongoose.model('orders', orderSchema)
module.exports = order