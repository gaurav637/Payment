const {Product} = require('./models/product.model.js');

export const createProductsService = async (reqBody,res) => {
    try{
        const product = new Product(reqBody);
        return product;

    }catch(err){
        res.status(500).json({
            Message: 'failed to create prodcuts!',
            success: "false",
        });
    }
}

export const getAllProductService = async () =>{
    const products = await Product.find();
    return products;
}
