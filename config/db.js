const mongoose = require('mongoose')

const connectDb = async () => {
    try { 
        
        const connection = await mongoose.connect('mongodb+srv://ashifktashifkt4697:tcErAECUN2pPyyAz@pickbucket.kkzpz87.mongodb.net/', {
            useNewUrlParser: 'true'
        })
        console.log("Mongodb database Connected!");

    }
    catch (err) {
        console.log(err);
    }
}

// 'mongodb://127.0.0.1:27017/pickbucket'
module.exports=connectDb;