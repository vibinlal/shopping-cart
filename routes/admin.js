var express = require('express');
var path = require('path');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers')


/* GET users listing. */
router.get('/', function (req, res, next) {

  productHelpers.getAllProduct().then((products) => {
    res.render('admin/view-products', { admin: true, products });
  })

});

router.get('/add-products', function (req, res) {

  res.render('admin/add-products',{admin: true});

});

router.post('/add-products', (req, res) => {
  //console.log(req.body);
  //console.log(req.files.image);

  let image = req.files.image
  var ImageName = req.files.image.name
  var extension = (path.extname(ImageName));

  let products = {
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    imageExtention: extension
  }
  // console.log(req.body)s
  // console.log(products)

  productHelpers.addProduct(products, (id) => {

    console.log('Inserted ID : ' + id)

    image.mv('./public/product_images/' + id + extension, (err, done) => {
      if (!err) {
        res.render('admin/add-products');
      }
      else {
        console.log('error while saving image ' + err)
      }
    })

  })

});

router.get('/delete-product/:Id', function (req, res) {

  let prodId = req.params.Id
  productHelpers.deleteProduct(prodId).then((response) => {
    res.redirect('/admin');
  })

});

router.get('/edit-product/:Id', (req, res) => {

  let prodId = req.params.Id
  productHelpers.getProductDetail(prodId).then((product) => {
    console.log(product)
    res.render('admin/edit-products', { admin: true, product });
  })

});

router.post('/edit-product/:Id', (req, res) => {

  let prodId = req.params.Id
  console.log(prodId)
  console.log("hai update")

  let extension = '', imageExtention = '';
  let image

  if (req.files) {
    image = req.files.image;
    let ImageName = req.files.image.name;
    extension = path.extname(ImageName);
  }
  else {
    imageExtention: req.body.imageExtention;
  }

  let products = {
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    imageExtention: (extension == "" ? imageExtention : extension)
  }

  productHelpers.updatetProduct(prodId, products).then((id) => {

    if (extension != "") {

      image.mv('./public/product_images/' + id + extension, (err, done) => {
        if (!err) {
          res.redirect('/admin');
        }
        else {
          console.log('error while saving image ' + err)
        }
      })

    }
    else {
      res.redirect('/admin');
    }

  })

});



module.exports = router;
