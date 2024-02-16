const USERS = require('../Models/userModels')
const PRODUCT = require('../Models/productModels');


const getUsersData =async(req,res)=>{
     try {

     await   USERS.find({role:3}).count().then((response)=>{
            res.status(200).json({response})
        })
        
     } catch (error) {
        res.status(400).json(error)
     }
}


const getVendorsData =async(req,res)=>{
    try {

     await USERS.find({role:2}).then((response)=>{
           res.status(200).json({response})
       })
       
    } catch (error) {
       res.status(400).json(error)
    }
}

const deleteVendor =async(req,res)=>{
    
         console.log(req.query , "vendor idsssssssss");
    try {

   await USERS.findByIdAndDelete({_id:req.query.id}).then((response)=>{
      res.status(200).json({msg:'deleted vendor'})
})
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}



const getProductCount =async(req,res)=>{
    try {

     await  PRODUCT.find().count().then((response)=>{
           res.status(200).json({response})
       })
       
    } catch (error) {
       res.status(400).json(error)
    }
}



module.exports ={getUsersData,getVendorsData,deleteVendor,getProductCount }