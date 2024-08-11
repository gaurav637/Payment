const {Product} = require('../models/product.model.js');
const {productsService} = require('../services');

module.exports.createProducts = async (req,res) => {
    const product = await productsService.createProductsService(req.body,res);
    res.status(201).json({Message: "product create", success: "true", Data: product});
}

module.exports.getProducts = async (req,res) =>{
    const products = await productsService.getAllProductService();
    res.status(200).json({Message: "product get.", success: "true",Data: products});
}