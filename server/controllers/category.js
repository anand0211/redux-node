// Require mongoose
var mongoose = require("mongoose");

// Load models by name
var Category = mongoose.model("Category");

// Create a controller object to use for export
var showcategoryController = {};

// Call the "show" method for the controller object
showcategoryController.manageCategory = function(req, res) {

    Category.find({}).exec(function (err, categories) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("category/manage_category", {title:'Manage Category',categories: categories});
        }
    });
};

showcategoryController.newcategoryform = function(req, res) {
    res.render("category/add_category",{title:'Add Category'});
};

showcategoryController.addCategory = function(req, res) {
    console.log(req.body);
    var category = new Category(req.body);
    // Save a single category into MongoDB
    category.save(function(err) {
        // Show form data posted
        //console.log("POST DATA", req.body);

        if(err) {
            console.log("Category not added to 'category' collection.");
            res.render("/add_category");
        }
        else {
            console.log("Successfully added an category.");
            res.redirect("/manage_category");
        }
    });
};

// Update single category document
showcategoryController.updateSingleCategory = function(req, res) {

    Category.findOne({_id: req.params.id}, function(err, singleCategory) {

        console.log("Edit an category");

        res.render("category/edit_category", {title:'Update Category',singleCategory: singleCategory});
    });
};

// Update a single category name controller method
showcategoryController.executeUpdateCategory = function(req, res) {

    // Update a single category
    Category.update({_id: req.params.id}, 
        {$set: 
            {
                category_name: req.body.category_name,
                description:req.body.description,
                status:req.body.status
            } 
        }, 
        function(err) {
        // If error exists display it
        if(err) {
            console.log("Update Category Error:", err);
        }
        else {
            console.log("New Category Updated");
            res.redirect("/manage_category");
        }

    });

};

// Delete a single category document method
showcategoryController.deleteCategory = function(req, res) {

    // Delete a single category document
    // and redirect to the manage category page
    Category.remove({_id: req.params.id}, function(err) {

        // If error exists display it
        if(err) {
            console.log("Delete Category Error", err);
        }
        else {
            console.log("Category deleted!");
            res.redirect("/manage_category");
        }

    });
};

module.exports = showcategoryController;