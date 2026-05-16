
const productModel = require('../models/product.model');

async function getAllProducts(req, res, next){
     try{
          const products = await productModel.findAll() ;
          res.render('customer/products/allProducts', {products : products});

     }catch(error){
          next(error);
     }
    
}

async function getProductData(req, res, next){

     try{
          const product = await productModel.findById(req.params.id);
          res.render('customer/products/product-details', {product: product}  );

     }
     catch(error){
          next(error);
     }

}

module.exports = {
     getAllProducts : getAllProducts,
     getProductData : getProductData
};  