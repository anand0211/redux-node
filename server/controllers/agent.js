// Require mongoose
var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var moment = require('moment');

// Load models by name
var Agent = mongoose.model("Agent");

// Create a controller object to use for export
var agentController = {};

// Go to form to add a new form

agentController.newform = function(req, res) {
    res.render("pages/index",{title: 'regi'});
};

// Add a new Record into the MongoDB
agentController.addagent = function(req, res) {
    // Create a new "user" object
    var body = req.body;
    console.log(body);
    //Validation close
    var hash = bcrypt.hashSync(body.password, 10);
    var agent = new Agent({
      username: body.username,
      password: hash
    });
    agent.save(function(err) {
        if(err) {
            console.log("agent not added to 'agent' collection.");
        }
        else {
            console.log("Successfully updated Agent.");
            console.log(agent);
            
        }
    });
};

module.exports = agentController;