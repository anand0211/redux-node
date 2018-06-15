// Show export to "userController" controller
var showanimals = require("../controllers/user.js");
// Show export to "CategoryController" controller
var showCategory = require("../controllers/category.js");
//Show export to "ProductController" controller
var showProduct = require("../controllers/product.js");

var Products = require("../controllers/products.js");

var Agent = require("../controllers/agent.js");

var multer = require('multer');


// Pass routes from this file to app.js
module.exports = function(app) {

    app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

    //Image Uploading start
    var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        var images=Date.now()+'.jpg';
        req.filename =  images;
        callback(null, './public/uploads')
    },
    filename: function(req, file, callback) {
        callback(null, req.filename)
        }
    });
    var upload = multer({ storage: storage}).single('userFile');
    //Uploading close

    // Login page
    app.get("/userlogin", function(req, res) {
        showanimals.newform(req, res);
    });

    //Signup Page
    app.get("/signup", function(req, res) {
        showanimals.newsignup(req, res);
    });

    app.post("/validate/fields", function(req, res){
        showanimals.userValidate(req, res);
    });

    // Route to add an user to DB
    app.post("/registration", function(req, res) {
        showanimals.adduser(req, res);
    });

    //Route to check login
    app.post("/login", function(req, res) {
        showanimals.login(req, res);
    });

    app.post("/userlogin", function(req, res){
        showanimals.userlogin(req, res);
    })

    //Route for show view profile
    app.get("/profile", function(req, res) {
        showanimals.profile(req, res);
    });


    //Route for show form of add category
    app.get("/add_category", function(req, res) {
        showCategory.newcategoryform(req, res);
    });

    app.post("/add_category", function(req,res){
        showCategory.addCategory(req, res);
    });


    app.get("/manage_category", function(req, res) {
        showCategory.manageCategory(req, res);
    });

    // Update a single category
    app.get("/category/:id/edit", function(req, res) {
        showCategory.updateSingleCategory(req, res);
    });

    // Route to update a single
    app.post("/category/:id", function(req, res) {
        showCategory.executeUpdateCategory(req, res);
    });

    // Route to delete a single
    app.get("/category/:id/destroy", function(req, res) {
        showCategory.deleteCategory(req, res);
    });
    //Route for Manage Product 
     app.get("/manage_product", function(req, res) {
        showProduct.manageProduct(req, res);
    });

     //Route for show form of Add Product
    app.get("/add_product", function(req, res) {
        showProduct.productform(req, res);
    });

    app.post("/add_product", upload, function(req, res) {
        showProduct.addProduct(req, res);
    });

    // Update a single Product
    app.get("/product/:id/edit", function(req, res) {
        showProduct.updateSingleProduct(req, res);
    });

    // Route to update a single
    app.post("/product/:id", upload, function(req, res) {
        showProduct.executeUpdateProduct(req, res);
    });

    // Route to delete a single
    app.get("/product/:id/destroy", function(req, res) {
        showProduct.deleteProduct(req, res);
    });

    app.get("/image", function(req, res){
        showProduct.showImg(req, res);
    });

    app.post("/photo", function(req, res){
        showProduct.addPhoto(req, res);
    })

    //New Products Details
    app.get("/getProducts/:page", function(req, res){
        Products.getProducts(req, res);
    });

    app.get("/getProduct/:id", function(req, res){
        Products.Singlesproduct(req, res);
    });

    app.get("/getHomeProducts", function(req, res){
        Products.getHomeProducts(req, res);
    });

    app.get("/searchProducts/:keyword", function(req, res){
        Products.searchProducts(req, res);
    });

    app.get("/createProducts", function(req, res){
        Products.createProducts(req, res);
    });

    app.post("/addAgent", function(req, res) {
        Agent.addagent(req, res);
    });

}