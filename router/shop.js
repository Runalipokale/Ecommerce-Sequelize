const path = require('path');

const express = require('express');

const shopController = require('../controller/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// extract the information through that product id so instead of writing /product/:productId for productId their 
//is any random id
router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.post('/create-order', shopController.postOrder);

module.exports = router;
