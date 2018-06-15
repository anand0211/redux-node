// Require mongoose
var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var moment = require('moment');
var dateFormat = require('dateformat');
var now = new Date();

// Load models by name
var User = mongoose.model("User");

var Customer = mongoose.model("Customer");

// Create a controller object to use for export
var userController = {};

// Go to form to add a new form
userController.newform = function(req, res) {
    res.render("pages/index",{title: 'Login'});
};

userController.newsignup = function(req, res){
    res.render("pages/signup",{title : 'Signup'});
};

// userController.profile = function(req, res){
//     res.render("pages/profile",{title : 'Profile'});
// };

function validateSignUpForm(values, callback) {
  var errors = {};
  var hasErrors = false;

  if (!values.firstName || values.firstName.trim() === '') {
    errors.firstName = 'Enter a First Name';
    hasErrors = true;
  }
  if (!values.lastName || values.lastName.trim() === '') {
    errors.lastName = 'Enter Last Name';
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

function validateLogin(values, callback) {
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

function isUserUnique(reqBody, cb) {
  //var username = reqBody.username ? reqBody.username.trim() : '';
  var email = reqBody.email ? reqBody.email.trim() : '';

  User.findOne({
    $or: [{
      'email': new RegExp(["^", email, "$"].join(""), "i")
    }]
  }, function(err, user) {
    if (err)
      throw err;

    if (!user) {
      cb();
      return;
    }

    var err;
    
    if (user.email === email) {
      err = err ? err : {};
      err.email = '"' + email + '" is not unique';
    }
    cb(err);
  });
}

// Add a new Record into the MongoDB
userController.adduser = function(req, res) {
    // Create a new "user" object
    // to save
    var body = req.body;
    //console.log(body);
    //Validation start
     var errors = validateSignUpForm(body);
     if (errors) 
     {
         console.log(errors);
         return res.status(403).json(errors);
     }
    //Validation close
    isUserUnique(body, function(err) {
     if (err) {
         console.log(err);
       return res.status(403).json(err);
     }
    var hash = bcrypt.hashSync(body.password, 10);
    var user = new User({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hash,
      isVerified: false,
      status:false
    });
    // Save a single user into MongoDB
    user.save(function(err, user) {
        // Show form data posted
        //console.log("POST DATA", req.body);
        if(err) 
          throw err;
            var token = jwt.sign({ _id:user._id },'e177920e88165bd0090b1c6b544cf7', {expiresIn: 60 * 60 * 24});
              res.json({
                user: user,
                token: token
              });
            console.log(token);
    });
});
};

userController.login = function(req, res) {

    var body = req.body;
    var MAX_LOGIN_ATTEMPTS = 3;
    var LOCK_TIME = 2 * 60 * 60 * 1000;//(2 hour lock)
    //Validation start
    var errors = validateLogin(body);
    if (errors) {
        console.log(errors);
        return res.status(403).json(errors);
    }
    //Validation close

    User.findOne({ email: body.email},function(err, user) {

      if (err)
        throw err;
      bcrypt.compare(body.password, 
        user.password, function(err, valid, cb) {
        if (!valid) {
            console.log(user.login_attempt);
          if(user.login_attempt <= MAX_LOGIN_ATTEMPTS)
          {
            User.update({email: user.email},
                {$set:{login_attempt: user.login_attempt + 1}  },
                function (err, updated) {
                console.log("Update Fields",updated);
                });
            return res.status(404).json({
            error: true,
            message: 'Username or Password is Wrong && Your Login Attempt '+ user.login_attempt 
          });
          }else{

            if(user.end_block_time <= Date.now()){
              return res.json({
                error:true,
                message:'Your Email ID Unblock'
              });
              console.log('Your Email ID Unblock');
            }            

            User.update(
              {email: user.email},
                {$set:
                  {
                  start_block_time: Date.now(),
                  end_block_time : Date.now() + LOCK_TIME
                }  
              },
                function (err, updated) {
                console.log("Update Fields",updated);
                });
            return res.status(404).json({
            error: true,
            message: 'Username or Password is Wrong && Your Email id Block',
            user:user 
          });
          }
        }

        var token = jwt.sign({ _id:user._id },'e177920e88165bd0090b1c6b544cf7', {expiresIn: 60 * 60 * 24});
        res.json({
          user: user,
          token: token
        });
        console.log(token);
        User.update({email: user.email},{$set: 
          {
            login_attempt: 0, 
            last_login: Date.now() 
          } 
        }).exec(function (err, updated) 
        {
            console.log("Last Loggdin",updated);
        });
      });

});
};


userController.userlogin = function(req, res) {

    var body = req.body;
    //Validation start
    var errors = validateLogin(body);
    if (errors) {
        console.log(errors);
        return res.status(403).json(errors);
    }
    //Validation close

    User.findOne({ email: body.email},function(err, user) {

      if (err)
        throw err;
      bcrypt.compare(body.password, 
        user.password, function(err, valid, cb) {
        if (!valid) {
        return res.status(404).json({
            error: true,
            message: 'Username or Password is Wrong'
          });
        }
        var token = generateToken(user);
        res.json({
          user: user,
          token:token
        });
        User.update({email: user.email},{$set: {
        login_attempt: 0, last_login: Date.now() } 
        }).exec(function (err, updated) {
            console.log("Last Loggdin",updated);
        });
      });

});
};

//currently validating uniqueness for username
userController.userValidate = function(req, res) {
  var body = req.body;

  isUserUnique(body, function(err) {
    if (err) {
      return res.status(403).json(err);
    } else {
      return res.json({});
    }
  });
};

module.exports = userController;