const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');

router.get('/', function(req,res){
     res.redirect('/products');
});

router.get('/401', function(req, res){
     res.render('shared/401_error');
})

router.get('/403', function(req, res){
     res.render('shared/403_error');
})

module.exports = router ;