const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const {
    createProduct,
    allProduct,
    selectProduct,
    deleteProduct,
    updateProduct,
    topSelling
} = require('../controllers/productController')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
const upload = multer({ storage: storage });

//Get all products
router.get('/', allProduct)

//Get specific product
router.get('/:id', selectProduct)

//Insert product
router.post('/',  upload.single('image'), createProduct)

//Delete product
router.delete('/:id', deleteProduct)

//Update the product
router.patch('/:id',  upload.single('image'), updateProduct)

//Top selling product
router.get('/topselling/prod', topSelling)

module.exports = router