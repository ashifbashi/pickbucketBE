const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userpic:{
        type:String,
        required:false
    },
    number:{
        type:Number,
        required:false
    },
    role:{
        type:Number,
        required:true,
        default:3
    }

    // admin: 1
    // vender: 2
    // user: 3


})

const users = mongoose.model('users', userSchema)
module.exports=users