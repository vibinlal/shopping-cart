var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  
  productHelpers.getAllProduct().then((products)=>{
    res.render('index', {admin:false, products});
  })
  
});

module.exports = router;
