const PRODUCT = require('../Models/productModels');
const Razorpay = require("razorpay");
const crypto = require('crypto')
const ORDER = require('../Models/orderModel')
const ObjectId = require('mongoose').Types.ObjectId

const orders =async(req,res)=>{

    console.log('inside the controller', req.body.params.productid);

   const productData = await PRODUCT.findOne({_id: req.body.params.productid})
   
   if (productData) {

    try {
        const instance = new Razorpay({
            key_id: 'rzp_test_cx9B8rETmWVZI6',
            key_secret: '1UlFRxTsFlnEMxSkyrEaJZKH',
        });

        const options = {
            amount: productData.rate*100, // amount in smallest currency unit
            currency: "INR",
            receipt: "req.body.params.productid",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
    
   } else {
    res.status(400).json({message: 'Product not avilable'})
   }

}


const paymentSuccess =async(req, res)=>{
     console.log("inside of success");
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
           
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "1UlFRxTsFlnEMxSkyrEaJZKH");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT



        await ORDER.updateOne(
            { userId: new ObjectId(req.query.userId) }, // Filter condition to find the order
            {
                // $set: {
                //     location: req.body.contactInfo.location,
                //     address: req.body.contactInfo.address,
                //     pincode: req.body.contactInfo.pincode,
                //     number: req.body.contactInfo.number,
                //     deliveryDate: 'delivery expected in 4 days'
                // },
                $push: {
                    products: { 
                        productId: req.query.productId,
                        vendorId: req.query.vendorId,
                        address: req.body.contactInfo.address,
                        location: req.body.contactInfo.location,
                        address: req.body.contactInfo.address,
                        pincode: req.body.contactInfo.pincode,
                        number: req.body.contactInfo.number,
                        quantity:req.body.contactInfo.quantity,
                        deliveryDate: 'delivery expected in 4 days'
                    }
                }
            },
            { upsert: true } // Option to create a new document if no match is found
        );

     console.log(req.body, "contact infppppppppp");

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }

}




const cartOrder =async(req,res)=>{


const productIds = req.body.params.productid.split(',').map(id => id.trim());

// Assuming PRODUCT is your Mongoose model
const productData = await PRODUCT.find({ _id: { $in: productIds } });

    console.log(productData, "find dataaaaaaaa");

   if (productData) {

    try {
        const instance = new Razorpay({
            key_id: 'rzp_test_cx9B8rETmWVZI6',
            key_secret: '1UlFRxTsFlnEMxSkyrEaJZKH',
        });

        const options = {
            amount: req.body.params.ammount*100, 
            currency: "INR",
            receipt: "req.body.params.productid",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
    
   } else {
    res.status(400).json({message: 'Product not avilable'})
   }



}



const cartOrderSuccess =async(req, res)=>{
    console.log("inside of success");
   try {
       // getting the details back from our font-end
       const {
           orderCreationId,
           razorpayPaymentId,
           razorpayOrderId,
           razorpaySignature,
          
       } = req.body;

       // Creating our own digest
       // The format should be like this:
       // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
       const shasum = crypto.createHmac("sha256", "1UlFRxTsFlnEMxSkyrEaJZKH");

       shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

       const digest = shasum.digest("hex");

       // comaparing our digest with the actual signature
       if (digest !== razorpaySignature)
           return res.status(400).json({ msg: "Transaction not legit!" });

       // THE PAYMENT IS LEGIT & VERIFIED
       // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

    //    const productIds = req.query.productId.split(',');

    //     await ORDER.updateOne(
    //        {userId: new ObjectId(req.query.userId)},
    //        {$set:{
    //            location:req.body.contactInfo.location,
    //            address:req.body.contactInfo.address,
    //            pincode:req.body.contactInfo.pincode,
    //            number:req.body.contactInfo.number,
    //            deliveryDate:'delivery expected in 4 days'
    //            },
    //            $push: { products: { $each: productIds } },
    //         },
    //        {upsert: true}
    //        )


    const productIds = req.query.productId.split(',');
    const vendorIds = req.query.vendorId.split(',');
    
    // Assuming productIds and vendorIds have the same length and correspond to each other
    for (let i = 0; i < productIds.length; i++) {
        const productId = productIds[i];
        const vendorId = vendorIds[i];
    
        await ORDER.updateOne(
            { userId: new ObjectId(req.query.userId) },
            {
                $push: {
                    products: {
                        productId: productId,
                        vendorId: vendorId,
                        address: req.body.contactInfo.address,
                        location: req.body.contactInfo.location,
                        pincode: req.body.contactInfo.pincode,
                        number: req.body.contactInfo.number,
                        deliveryDate: 'delivery expected in 4 days'
                    }
                }
            },
            { upsert: true }
        );
    }
    




    console.log(req.body, "contact infppppppppp");

       res.json({
           msg: "success",
           orderId: razorpayOrderId,
           paymentId: razorpayPaymentId,
       });
   } catch (error) {
       res.status(500).send(error);
   }

}






module.exports={ orders, paymentSuccess, cartOrder,cartOrderSuccess }