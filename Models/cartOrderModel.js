const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],

    timeStamb:{
        type:Date,
        default:new Date()
    }


})

const cart = mongoose.model('cart', cartSchema)
module.exports=cart