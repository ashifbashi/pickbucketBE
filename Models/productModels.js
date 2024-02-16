const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true
    },
    catecory:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true,
    },
    rate:{
        type:Number,
        required:true,
    },
    productPic:{
        // type:String,
        type: [String],
        required:true,
    },
   
    vendorId:{
        type:String,
        required:true,
    },
    timeStamb:{
        type:Date,
        default:new Date()
    }


})

const product = mongoose.model('product', productSchema)
module.exports=product