const PRODUCT = require('../Models/productModels');
const { response } = require('../app');
const ORDER = require('../Models/orderModel')
const ObjectId = require('mongoose').Types.ObjectId


// const addProductData = async (req, res) => {

//     console.log(req.query);

//     try {

//         await PRODUCT({
//             productName: req.query.productName,
//             brand: req.query.brand,
//             catecory: req.query.catecory,
//             discription: req.query.discription,
//             details: req.query.details,
//             rate: req.query.rate,
//             vendorId: req.query.vendorId,
//             productPic:req.file.filename
    
            
//         }).save().then((response)=>{
//             res.status(200).json({message: "Product added successfull"})
//         })

//     } catch (error) {
//         res.status(500).json({message: "Product adding filed"}, error)
//         console.log(error);
//     }


// }

const addProductData = async (req, res) => {
    try {
        const {
            productName,
            brand,
            catecory,
            discription,
            details,
            rate,
            vendorId
        } = req.query;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        const productPics = req.files.map(file => file.filename);

        const product = new PRODUCT({
            productName,
            brand,
            catecory,
            discription,
            details,
            rate,
            vendorId,
            productPic: productPics
        });

        await product.save();
        res.status(200).json({ message: "Product added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Product adding failed", error: error.message });
        console.error(error);
    }
};



const myProducts=async(req,res)=>{

    try {

      await  PRODUCT.find({vendorId:req.query.vendorId}).then((response)=>{
        res.status(200).json({response})
      })
        
    } catch (error) {
        res.status(400).json({message:'products not found'})
    }
     
}


const deleteProduct=async(req, res)=>{

    try {
        
        await PRODUCT.findByIdAndDelete({vendorId: req.query.vendorId, _id: req.query.productId}).then((response)=>{
            console.log(response);
            res.status(200).json(response)
        })

    } catch (error) {
        res.status(400).json(error)
    }
   
}


const getOredrItem =async(req, res)=>{

 try {

    await ORDER.aggregate([
        {$match: { 'products.vendorId': new ObjectId(req.query.vendorId) }},
        {$unwind: '$products'},
        {$lookup: {
          from:'products',
          localField:'products.productId',
          foreignField:'_id',
          as:"productinfo"
        }},
        {$lookup: {
           from:'users',
           localField:'userId',
           foreignField:'_id',
           as:"userinfo"
         }},
        {$project:{
          userinfo: { $arrayElemAt: ["$userinfo", 0] },
          productinfo: { $arrayElemAt: ["$productinfo", 0] },
          userId: 1,
          'products.deliveryDate': 1,
          'products.location': 1,
          'products.address': 1,
          'products.pincode': 1,
          'products.number': 1,
          'products.orderDate': 1,
          'products.quantity': 1,
      }},
      ]).then((response) => {
        res.status(200).json(response)
    })
    
 } catch (error) {
    console.log('order item fetch error', error);
 }

 
 }



module.exports = { addProductData, myProducts, deleteProduct, getOredrItem }