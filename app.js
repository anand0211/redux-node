// Require path
var path = require("path");
// Require epxress and create express app
var express = require("express");
var app = express();
var port = 3001;
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var busboy = require("then-busboy");
var fileUpload = require('express-fileupload');
var session = require('express-session');


//var formidable = require('express-formidable');

//var multer = require('multer');

// Require body-parser to be able to send POST data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Link to mongoose.js
require("./server/config/mongoose.js");

// Link to routes.js and pass in "app" variable
require("./server/config/routes.js")(app);

require("./server/config/admin_routes.js")(app);

// set the view engine to ejs
app.set('view engine', 'ejs');
require('dotenv').config();


/* Set for call CSS / JS FILES */
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(fileUpload());
app.disable('etag');


app.listen(port, () => {
    console.log("Server listening on port " + port);
});