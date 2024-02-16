var express = require('express');
var router = express.Router();
const {getUsersData,getVendorsData, deleteVendor, getProductCount} = require('../Controllers/adminController')


router.get('/getUsersData', getUsersData)
router.get('/getVendorsData', getVendorsData)
router.delete('/deleteVendor', deleteVendor)
router.get('/getProductCount', getProductCount)



module.exports = router;