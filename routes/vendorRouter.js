var express = require('express');
var router = express.Router();
const multer = require('multer');
const { addProductData, myProducts, deleteProduct, getOredrItem } = require('../Controllers/vendorController')


// const fileStorage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'public/product')
//     },
//     filename:(req,file,cb)=>{
//         cb(null, Date.now()+"-"+file.originalname)
//     }
// })

// const upload = multer({storage:fileStorage})


// router.post('/addProductData', upload.single('image'), addProductData)
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/product');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: fileStorage });

router.post('/addProductData', upload.array('images', 5), addProductData);
router.get('/myproducts', myProducts)
router.delete('/deleteProduct', deleteProduct)
router.get('/getOredrItem', getOredrItem)


module.exports = router;