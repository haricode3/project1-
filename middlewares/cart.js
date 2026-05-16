const Cart = require('../models/cart.model')

function initializeCart(req, res, next){

     //cart item is already existing stored on req.session i.e. the user session
     //if not new created
     // then for the next req, res cycles, the cart item data stored in 
     //res.locals.cart

     let cart ;
     if(!req.session.cart ){
          cart = new Cart() ;
     }
     else{
          const sessionCart = req.session.cart ;
          cart = new Cart( sessionCart.items, sessionCart.totalQuantity, sessionCart.totalPrice ); 
     } 
     res.locals.cart = cart ;
     next();
}

module.exports = initializeCart ;