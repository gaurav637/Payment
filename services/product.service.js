const Product = require('../models/product.model.js');

module.exports.createProductsService = async (reqBody,res) => {
        const product = new Product(reqBody);
        product.save();
        return product;
}

module.exports.getAllProductService = async () =>{
    const products = await Product.find();
    return products;
}
