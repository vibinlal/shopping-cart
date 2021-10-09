var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers')
var uservalidator = require('../validator/user-validator')
var userHelpers = require('../helpers/user-helpers')
const { body, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function (req, res, next) {

  let user = req.session.user

  productHelpers.getAllProduct().then((products) => {
    res.render('index', { admin: false, products, user });
  })

});

router.get('/login', function (req, res, next) {

  res.render('user/login', { errors: req.session.errors });
  req.session.errors = null

});

router.get('/signup', function (req, res, next) {

  res.render('user/signup', { errors: req.session.errors });
  req.session.errors = null

});


router.post('/signup', uservalidator.validateUserMaster, function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    
    req.session.errors = errors.array();
    res.redirect('/signup');
  }

  else {

    let UserDet = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      isUser: 1
    }

    userHelpers.doSignup(UserDet).then((id) => {
      let UserId = id
      userHelpers.GetUser(UserId).then((response) => {
        if (response.status) {
          req.session.loggedIn = true
          req.session.user = response.user

          res.redirect('/');
        }
        else {
          res.redirect('/login');
        }

      })

    })

  }

});

router.post('/login',
  body('email', "Enter a valid email address").isEmail(),
  body('password', "Enter the Password").not().isEmpty().trim().escape(),
  function (req, res, next) {

    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      req.session.errors = errors.array();
      res.redirect('/login');
    }
    else {
      userHelpers.dologin(req.body).then((response) => {
        if (response.status) {
          req.session.loggedIn = true
          req.session.user = response.user

          res.redirect('/');
        }
        else {
          var Sererrors = errors.array();
          Sererrors.push({"msg":"invalid User name or password"});
          //Sererrors.push({value: '',msg: 'Enter a valid email address',param: 'email',location: 'body'});
          console.log(Sererrors)
          req.session.errors = Sererrors;
          res.redirect('/login');
        }

      })

    }


  });

router.get('/logout', function (req, res, next) {
  req.session.destroy()
  res.redirect('/login');

});


module.exports = router;
