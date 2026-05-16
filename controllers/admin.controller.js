const productModel  = require('../models/product.model');

async function getProducts(req, res){

     const products = await productModel.findAll() ;
     res.render('admin/products/allProducts', {products : products});

}

async function createNewProduct(req, res, next){
     
     const product = new productModel({
          ...req.body,
          image : req.file.filename 
     });

     try{
          await product.save() ;

     }
     catch(error){
          next(error);
          return ;
     }
     


     res.redirect('/admin/products');

}

function getNewProduct(req,res){
     res.render('admin/products/newProduct');

}

async function getUpdateProduct(req, res, next){
     
     try{
          const product = await productModel.findById(req.params.id);
          res.render('admin/products/updateProduct', {product : product});


     } catch(error){
          next(error);
     }

}

async function updateProduct(req, res, next){



     const product = new productModel({
          ...req.body ,
          _id : req.params.id 
     })
     if(req.file){
          product.replaceImage(req.file.filename) ;
     }

     try{
          await product.save();
     } catch(error){
          next(error);
          return ;

     }
     res.redirect('/admin/products');


}

async function deleteProduct(req, res, next){
     try{
          const product = await productModel.findById(req.params.id) ;
          await product.remove();

     } catch(error){
         return next(error);

     }
     res.json({message : 'Deleted Product!'});

}


module.exports = {
     getProducts : getProducts,
     createNewProduct : createNewProduct,
     getNewProduct : getNewProduct,
     getUpdateProduct : getUpdateProduct,
     updateProduct : updateProduct,
     deleteProduct : deleteProduct
}