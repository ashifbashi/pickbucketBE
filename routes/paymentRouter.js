var express = require('express');
var router = express.Router();
const { orders, paymentSuccess, cartOrder, cartOrderSuccess }=require('../Controllers/paymentController')
const { userAuth } = require('../middlewares/authorization');

router.post('/orders',userAuth, orders)
router.post('/success',userAuth, paymentSuccess)
router.post('/cartOrder', cartOrder) 
router.post('/cartOrderSuccess', cartOrderSuccess) 


module.exports = router;