const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
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

const wishlist = mongoose.model('wishlist', wishlistSchema)
module.exports=wishlist