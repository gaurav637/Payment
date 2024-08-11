const express = require('express');
const router = express.Router();
const {productController} = require('../controllers');

router.post(
    '/create', 
    productController.createProducts
);

router.get(
    '/get',
    productController.getProducts
);


module.exports = router;