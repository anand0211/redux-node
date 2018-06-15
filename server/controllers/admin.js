// Require mongoose
var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var express = require("express");
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var moment = require('moment');
var app = express();
var flash = require('connect-flash');
app.use(flash());


// Load models by name
var Admin = mongoose.model("Admin");

// Create a controller object to use for export
var adminController = {};

// Show Admin Signup Form with ejs.
adminController.adminform = function(req, res) {
    res.render("pages/admin_signup",{title: 'Admin SignUp'});
};

adminController.adminLoginform = function(req, res) {
    res.render("pages/admin_signin",{title: 'Admin SignIn'});
};

function validateAdminSignUp(values, callback) {
  var errors = {};
  var hasErrors = false;

  if (!values.firstName || values.firstName.trim() === '') {
    errors.firstName = 'Enter a First Name';
    hasErrors = true;
  }
  
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
    hasErrors = true;
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  
  if (callback) {
    callback(hasErrors && errors);
  } else {
    return hasErrors && errors;
  }
}

function validateAdminLogin(values, callback) {
    errors = {};
    hasErrors = false;

  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter a Email';
    hasErrors = true;
  }

  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter a Password';
    hasErrors = true;
  }

  if (callback) {
    callback(hasErrors && errors);
  } else {
    return hasErrors && errors;
  }
}


// Add a Admin Record into the MongoDB
adminController.addAdmin = function(req, res) {
    
    //console.log(req.method);
    var body = req.body;
    //console.log(body);
    //return false;

    var errors = validateAdminSignUp(body);
     if (errors) 
     {
         console.log(errors.firstName);
         return res.json(errors);
     }

    var hash = bcrypt.hashSync(body.password, 10);
    var admin = new Admin({
      name: body.firstName,
      email: body.email,
      password: hash
    });
    // Save a admin into MongoDB
    admin.save(function(err, admin) {
        if(err){
          console.log(res.json({}));
        } 
          //throw err;
              // res.json({
              //   admin: admin
              // });
              //req.flash('successMessage', 'You are successfully using req-flash');
              res.redirect("/");
              //res.send('You are successfully');
              //res.render("pages/admin_signin");
    });
};

adminController.adminlogin = function(req, res) {

    var body = req.body;

    var errors = validateAdminLogin(body);
     if (errors) 
     {
         console.log(errors);
         return res.json(errors);
     }
    
    Admin.findOne({ email: body.email},function(err, admin) {
      if (err)
        throw err;
      bcrypt.compare(body.password, 
        admin.password, function(err, valid, cb) {
        if (!valid) {
        return res.status(404).json({
            error: true,
            message: 'Email or Password is Wrong'
          });
        }
        // res.json({
        //   admin: admin,
        // });
        res.render("pages/profile", {title:'Profile'});
      });
});
};

adminController.profile = function(req, res){
    res.render("pages/profile",{title : 'Profile'});
};

module.exports = adminController;