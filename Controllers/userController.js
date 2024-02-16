const PRODUCT = require('../Models/productModels');
const WISHLIST = require('../Models/wishlistModel');
const CART = require('../Models/cartModels');
const { response } = require('express');
const ObjectId = require('mongoose').Types.ObjectId
const ORDER = require('../Models/orderModel')


const getAllProductData =async(req,res)=>{

  await  PRODUCT.find({catecory:'phone'}).limit(6).then((response)=>{

        res.status(200).json({response})
        console.log(response);
    }) 
    .catch((err)=>{
        res.status(500).json(err)
    })

}

const getLaptopProductData =async(req,res)=>{

  await  PRODUCT.find({catecory:'laptop'}).limit(6).then((response)=>{

        res.status(200).json({response})
        console.log(response);
    }) 
    .catch((err)=>{
        res.status(500).json(err)
    })

}

const getSingleProductData =async(req,res)=>{

   try {
    
  await PRODUCT.findOne({_id: req.query.productid}).then((response)=>{
    res.status(200).json({response})
   })

   } catch (error) {
     res.status(400).json({message:'Product data unavilable'})
   }

}


const addToWishlist =async(req, res)=>{
 console.log(req.body.params, "tttttttt");
const wishData = await WISHLIST.findOne({userId: req.body.params.userId})

  try {

    if (!wishData) {
      await WISHLIST({userId:req.body.params.userId}).save()
    } else {
    
      await  WISHLIST.updateOne({userId: req.body.params.userId}, {$push:{products:req.body.params.productId}}).then((response)=>{
        res.status(200).json({message:"Added to wishlist"})
      })
    }
  
  } catch (error) {
    res.status(400).json({message:"can't to add wishlist"})
  }
  
}

const getWishlistData =async(req,res)=>{
  
  await WISHLIST.aggregate([
    {$match:{userId: req.query.userId},},
    {$unwind: '$products'},
    {$lookup: {
      from:'products',
      localField:'products',
      foreignField:'_id',
      as:"productinfo"
    }},
    {$project:{
      productinfo: { $arrayElemAt: ["$productinfo", 0] },
      // _id:1,
      // productName:1,
      // brand:1,
      // catecory:1,
      // rate:1,
      // productPic:1
  }},
  ]).then((response) => {

    res.status(200).json(response)
  
})
// console.log(data);
}




const getToWishlist =async(req, res)=>{

  try {
    const wishlidt = await WISHLIST.aggregate([
      {$unwind: '$products'},
      {$match:{ products: new ObjectId(req.query.productId), userId: req.query.userId,}},
    ])
 
    console.log(wishlidt, "hthththththt");

    if (wishlidt.length > 0) {

        res.status(200).json({message:"yes wishlist"})
        return
    } else {
      res.status(200).json({message:"no wishlist"})
    }
    
  } catch (error) {
     console.log(error);
  }


}

const getAllPhoneData =async(req, res)=>{

  await  PRODUCT.find({catecory:'phone'}).then((response)=>{

    res.status(200).json({response})
  
}) 
.catch((err)=>{
    res.status(500).json(err)
})

}


const getAllLaptopAndComputerData =async(req, res)=>{

  await  PRODUCT.find({catecory:'laptop'}).then((response)=>{

    res.status(200).json({response})
    console.log(response);
}) 
.catch((err)=>{
    res.status(500).json(err)
})

}




const addToCart =async(req, res)=>{
  console.log(req.body.params, "tttttttt");
 const cartData = await CART.findOne({userId: req.body.params.userId})
 
   try {
 
     if (!cartData) {
       await CART({userId:req.body.params.userId}).save()
     } else {
     
       await  CART.updateOne({userId: req.body.params.userId}, {$push:{products:req.body.params.productId}}).then((response)=>{
         res.status(200).json({message:"Added to Cart"})
       })
     }
   
   } catch (error) {
     res.status(400).json({message:"can't to add Cart"})
   }
   
 }



 const getCartData =async(req,res)=>{
  
  await CART.aggregate([
    {$match:{userId: req.query.userId},},
    {$unwind: '$products'},
    {$lookup: {
      from:'products',
      localField:'products',
      foreignField:'_id',
      as:"productinfo"
    }},
    {$project:{
      productinfo: { $arrayElemAt: ["$productinfo", 0] },
      // _id:1,
      // productName:1,
      // brand:1,
      // catecory:1,
      // rate:1,
      // productPic:1
  }},
  ]).then((response) => {
    res.status(200).json(response)
})
// console.log(data);
}


const removeWishlist =(req, res)=>{

  try {
    WISHLIST.updateMany({userId: req.body.params.userId}, {$pull: {products: new ObjectId(req.body.params.productId)}}).then((response)=>{
      res.status(200).json({message: "removed from wishlist"})
    })
    
  } catch (error) {
    console.log(error);
  }


}


const getToCart =async(req, res)=>{

  try {
    const cartData = await CART.aggregate([
      {$unwind: '$products'},
      {$match:{ products: new ObjectId(req.query.productId), userId: req.query.userId,}},
    ])
 

    if (cartData.length > 0) {

        res.status(200).json({message:"yes cart"})
        return
    } else {
      res.status(200).json({message:"no cart"})
    }
    
  } catch (error) {
     console.log(error);
  }

}


const removeCart =async(req, res)=>{
  try {
   await CART.updateMany({userId: req.body.params.userId}, {$pull: {products: new ObjectId(req.body.params.productId)}}).then((response)=>{
      res.status(200).json({message: "removed from cart"})
    })
    
  } catch (error) {
    console.log(error);
  }
}


// const getMyOrderData =async(req, res)=>{
//   try {

//     await ORDER.aggregate([
//       {$match:{userId: new ObjectId(req.query.userId)},},
//       {$unwind: '$products'},
//       {$lookup: {
//         from:'products',
//         localField:'products',
//         foreignField:'_id',
//         as:"productinfo"
//       }},
//       {$project:{
//         productinfo: { $arrayElemAt: ["$productinfo", 0] },
//         userId:1,
//         deliveryDate:1,
//         timeStamb:1,
//     }},
//     ]).then((response) => {
//       res.status(200).json(response)
  
//   })
    
//   } catch (error) {
//      console.log(error);
//      res.status(400).json(error)
//   }
 

// }

const getMyOrderData = async (req, res) => {
  try {
    const orderData = await ORDER.aggregate([
      { $match: { userId: new ObjectId(req.query.userId) } },
      { $unwind: '$products' },
      { $lookup: {
          from: 'products',
          localField: 'products.productId', // Changed to match the productId in products array
          foreignField: '_id',
          as: 'productinfo'
        }
      },
      { $project: {
          _id: 0, // Exclude _id field from the output
          productInfo: { $arrayElemAt: ['$productinfo', 0] }, // Corrected field name to match the one in lookup
          userId: 1,
          deliveryDate: 1,
          deliveryDate: '$products.deliveryDate',
          quantity: '$products.quantity',
          timeStamp: 1 // Corrected field name to match the one in the schema
        }
      }
    ]);

    res.status(200).json(orderData);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};


const getDeliveryInfo =async(req,res)=>{
    try {
      await ORDER.findOne({userId: req.query.userId}).then((response)=>{
        res.status(200).json(response)
      })
      
    } catch (error) {
      res.status(400).json({msg:'user not found!'})
    }
}


const getTvProductData =async(req,res)=>{

  await  PRODUCT.find({catecory:'tv'}).limit(6).then((response)=>{

        res.status(200).json({response})
        console.log(response);
    }) 
    .catch((err)=>{
        res.status(500).json(err)
    })

}

const getAllTvData =async(req,res)=>{

  await  PRODUCT.find({catecory:'tv'}).then((response)=>{

        res.status(200).json({response})
        console.log(response);
    }) 
    .catch((err)=>{
        res.status(500).json(err)
    })

}

const getHeadphoneProductData =async(req,res)=>{

  await  PRODUCT.find({catecory:'headphone'}).limit(6).then((response)=>{

        res.status(200).json({response})
        console.log(response);
    }) 
    .catch((err)=>{
        res.status(500).json(err)
    })

}


const getAllHeadphoneData =async(req,res)=>{

  await  PRODUCT.find({catecory:'headphone'}).then((response)=>{

        res.status(200).json({response})
        console.log(response);
    }) 
    .catch((err)=>{
        res.status(500).json(err)
    })

}



const search =async(req,res)=>{

  try {
    const query = req.query.query;
    const results = await PRODUCT.find({ productName: { $regex: query, $options: 'i' } }); // Case-insensitive search
    res.json(results);
} catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
}

}


const getAllCatecoryDataData =async(req, res)=>{

  await  PRODUCT.find().then((response)=>{

    res.status(200).json({response})
    console.log(response);
}) 
.catch((err)=>{
    res.status(500).json(err)
})

}


module.exports = {
  getAllProductData,
  getSingleProductData,
  addToWishlist, 
  getLaptopProductData, 
  getWishlistData, 
  getToWishlist, 
  getAllPhoneData, 
  getAllLaptopAndComputerData,
  addToCart,
  getCartData,
  removeWishlist,
  getToCart,
  removeCart,
  getMyOrderData,
  getDeliveryInfo,
  getTvProductData,
  getAllTvData,
  getHeadphoneProductData,
  getAllHeadphoneData,
  getAllCatecoryDataData,
  search
}