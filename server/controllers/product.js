// Require mongoose
var path = require('path');
//var multer = require('multer');
var mongoose = require("mongoose");

// Load models by name
var Product = mongoose.model("Product");
var Category = mongoose.model("Category");

// Create a controller object to use for export
var showproductController = {};

// Call the "show" method for the controller object
showproductController.manageProduct = function(req, res) 
{
    Product.find({}).populate({ path: 'categories', select: 'category_name' }).exec(function (err, ProductList) {
        if (err) {
            console.log("Manage Product Error:", err);
        }
        else {
        	//console.log(ProductList);
            res.json(ProductList);
            //res.render("product/manage_product", {title:'Manage Product',ProductList: ProductList});
        }
    });
};

showproductController.productform = function(req, res) {

	Category.find({}).exec(function (err, Categories) {
        console.log("Get all Categories Lists");
        res.render("product/add_product", {title:'Add Product',Categories: Categories});
    });

};

showproductController.showImg = function(req, res){
	res.render("product/image");
};

showproductController.addPhoto = function(req, res){
    console.log(req.body);
    if(req.method == 'POST')
    {
      var post  = req.body;
      var title= post.title;

            if (!req.files)
                return res.status(400).
                send('No files were uploaded.');
            var file = req.files.userPhoto;
            var img_name=file.name;
            if(file.mimetype == "image/jpeg" ||
               file.mimetype == "image/png"||
               file.mimetype == "image/gif" )
            {

            }

    }else{
        res.render('image');
    }


}

//Save Product data 
showproductController.addProduct = function(req, res) {
    
    //console.log(req.filename);
    var product = new Product(req.body);
    var images=req.filename;

    // Save a single product into MongoDB
    product.images = images;
    product.save(function(err) {
        if(err) {
            console.log(err);
            console.log("Product not added");
            //res.render("product/add_product",{title:'Add Product'});
        }
        else {
            console.log("Successfully added an Product.");
            res.redirect("/manage_product");
        }
        console.log(product);
    });
};


// Update single category document
showproductController.updateSingleProduct = function(req, res) {
    Product.findOne({_id: req.params.id}, 
        function(err, singleProduct) {
    	Category.find({}).exec(function (err, Categories) {
        //console.log("Get Categories..",Categories);
        //console.log("Get Product..",singleProduct);
        res.render("product/edit_product", {title:'Update Product',singleProduct: singleProduct,Categories:Categories});
    	});
    });
};

// Get Single Product document
showproductController.getSingleProduct = function(req, res) {
    Product.findOne({_id: req.params.id},
        function(err, getProduct){
            if(err){
                console.log("Get Product Error");
            }else{
                res.json(getProduct);
            }
        });
};

//Update a single Product name controller method
showproductController.executeUpdateProduct = function(req, res) {

    //console.log(req.body);
    // Update a single product
    var images=req.filename;
    Product.update({_id: req.params.id}, 
        {$set: 
            {
                //categories: req.body.categories,
                productName: req.body.productName,
                sku: req.body.sku,
                description:req.body.description,
                prices:req.body.prices,
                publish:req.body.publish,
                images:images
            } 
        }, 
        function(err) {
        // If error exists display it
        if(err) {
            console.log("Update Product Error:", err);
        }
        else {
            console.log("Your Record Updated.!!!!!");
            res.redirect("/manage_product");
        }

    });

};

// Delete a single category document method
showproductController.deleteProduct = function(req, res) {

    // Delete a single Product 
    // and redirect to the manage Product page
    Product.remove({_id: req.params.id}, function(err) {

        // If error exists display it
        if(err) {
            console.log("Delete Product Error", err);
        }
        else {
            console.log("Product deleted!");
            res.redirect("/manage_product");
        }

    });
};

module.exports = showproductController;