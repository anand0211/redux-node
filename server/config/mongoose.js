// Require mongoose
var mongoose = require("mongoose");

 
// Require file-system so we can load, ready, require
// all of the model files
var fs = require("fs");
 
// Connect to "Node" DB
mongoose.connect("mongodb://localhost:27017/node-demo");
 
// Specify the path to all of the models
var modelsPath = __dirname + "/../models";
 
// Read all of the files in the modelsPath AND
// for each one check if it is a javascript file
// before requiring it
fs.readdirSync(modelsPath).forEach(function(file) {
    if(file.indexOf(".js") > 0) {
        require(modelsPath + "/" + file);
    }
});