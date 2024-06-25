
const path = require('path');

const express = require('express');

//for using admin controller in this file
const adminController = require('../controller/admin');

const router = express.Router();

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => GET
router.get('/add-products', adminController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);


//sendfile method
// router.get('/product',(req,res,next)=>{
//   res.sendFile(path.join(__dirname,'../','views','add-product.html'));
// })


module.exports = router; // exporting this file module to another file














