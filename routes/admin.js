var express = require('express');
var path = require('path');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers')


/* GET users listing. */
router.get('/', function(req, res, next) {

  productHelpers.getAllProduct().then((products)=>{
    res.render('admin/view-products', {admin:true, products});
  })
 
});


router.get('/add-products', function(req, res) {

  res.render('admin/add-products');

});

router.post('/add-products', (req, res)=> {
    //console.log(req.body);
    //console.log(req.files.image);

    let image = req.files.image  
    var ImageName = req.files.image.name      
    var extension = (path.extname(ImageName));
    
    let products = {
        name:req.body.name,
        category:req.body.category,
        description:req.body.description,
        imageExtention:extension
      }
    // console.log(req.body)s
    // console.log(products)

    productHelpers.addProduct(products,(id)=>{
    
      console.log('Inserted ID : ' + id)
     
      image.mv('./public/product_images/' + id + extension,(err,done)=>{
        if(!err)
        {
          res.render('admin/add-products');
        }
        else
        {
            console.log('error while saving image ' + err)
        }
      })
    
    })

});



module.exports = router;
