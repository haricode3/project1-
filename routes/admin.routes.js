const express = require('express');

const router = express.Router() ;

const adminController = require('../controllers/admin.controller');
const multerMiddleware = require('../middlewares/image_upload');

router.get('/products', adminController.getProducts);

router.get('/products/new', adminController.getNewProduct);

router.post('/products', multerMiddleware, adminController.createNewProduct );

router.get('/products/:id',adminController.getUpdateProduct ) ;

router.post('/products/:id', multerMiddleware  , adminController.updateProduct) ;

router.delete('/products/:id', adminController.deleteProduct );

module.exports = router ;