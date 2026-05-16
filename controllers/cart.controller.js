
const cartModel = require('../models/cart.model');
const productModel = require('../models/product.model');

function getCart(req, res){
     res.render('customer/cart/cart');
}

//addCartitem serves a post request so the request has a body 
async function addCartItem(req, res, next){
     let product ;
     try{
          product = await productModel.findById(req.body.productId);
     }
     catch(error){ 
          next(error);
          return ;
     }

     const cart = res.locals.cart // the cart in current req-res cycle
     cart.addItem(product);
     req.session.cart = cart ;
      
     res.status(201).json({
          message : 'cart successfully updated',
          newTotalItems : cart.totalQuantity 

     })
}

module.exports = {
     addCartItem : addCartItem,
     getCart : getCart 
};