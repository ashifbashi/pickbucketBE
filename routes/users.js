var express = require('express');
var router = express.Router();
const {
    getAllProductData ,
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
     search,
     getAllCatecoryDataData,
    }=require('../Controllers/userController')

router.get('/getAllProductData', getAllProductData)
router.get('/getSingleProductData', getSingleProductData)
router.post('/addToWishlist', addToWishlist)
router.get('/getLaptopProductData', getLaptopProductData)
router.get('/getWishlistData', getWishlistData)
router.get('/getToWishlist', getToWishlist)
router.get('/getAllPhoneData', getAllPhoneData)
router.get('/getAllLaptopAndComputerData', getAllLaptopAndComputerData)
router.post('/addToCart', addToCart)
router.get('/getCartData', getCartData)
router.put('/removeWishlist', removeWishlist)
router.get('/getToCart', getToCart)
router.put('/removeCart', removeCart)
router.get('/getMyOrderData', getMyOrderData)
router.get('/getDeliveryInfo', getDeliveryInfo)
router.get('/getTvProductData', getTvProductData)
router.get('/getAllTvData', getAllTvData)
router.get('/getHeadphoneProductData', getHeadphoneProductData)
router.get('/getAllHeadphoneData', getAllHeadphoneData)
router.get('/getAllCatecoryDataData', getAllCatecoryDataData)
router.get('/search', search)



module.exports = router;
