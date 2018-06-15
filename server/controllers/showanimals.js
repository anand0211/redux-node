// Require mongoose
var mongoose = require("mongoose");

// Load models by name
var User = mongoose.model("User");
var Category = mongoose.model("Category");
var Animal = mongoose.model("Animal");
var AddAnimal = mongoose.model("AddAnimal");
var UpdateAnimal = mongoose.model("UpdateAnimal");

// Create a controller object to use for export
var showanimalsController = {};

// Call the "show" method for the controller object
showanimalsController.show = function(req, res) {

    Animal.find({}).exec(function (err, animals) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../client/views/index", {animals: animals});
        }
    });
};

// Go to form to add a new animal to
// the MongoDB "animals" collection
showanimalsController.newanimalform = function(req, res) {
    res.render("../client/views/new");
};

// Add a new animal into the MongoDB
// the MongoDB "animals" collection
showanimalsController.addanimal = function(req, res) {
    // Create a new "animal" object
    // to save
    var animal = new Animal(req.body);

    // Save a single animal into MongoDB
    animal.save(function(err) {
        // Show form data posted
        //console.log("POST DATA", req.body);

        if(err) {
            console.log("Animal not added to 'animals' collection.");

            res.render("/mongooses/new");
        }
        else {
            console.log("Successfully updated an animal.");
            res.redirect("/");
        }
    });
};

// Show a single animal
showanimalsController.showSingleAnimal = function(req, res) {

    // Show one "animal" document based
    // on said document's "_id"
    Animal.findOne({_id: req.params.id}, function(err, animal) {

        res.render("../client/views/animal", {animal: animal});
    });

};

// Update single animal document
showanimalsController.updateSingleAnimal = function(req, res) {

    Animal.findOne({_id: req.params.id}, function(err, animal) {

        console.log("Edit an animal");

        res.render("../client/views/editanimal", {animal: animal});
    });
};

// Update a single animal name controller method
showanimalsController.executeUpdateAnimal = function(req, res) {

    // Update a single animal
    Animal.update({_id: req.params.id}, {$set: {name: req.body.name} }, function(err) {

        // If error exists display it
        if(err) {
            console.log("Update Animal Error:", err);
        }
        // Else update a single animal name
        else {
            console.log("New Animal Name:", req.body.name);
            res.redirect("/");
        }

    });

};

// Delete a single animal document method
showanimalsController.deleteAnimal = function(req, res) {

    // Delete a single animal document
    // and redirect to the home page
    Animal.remove({_id: req.params.id}, function(err) {

        // If error exists display it
        if(err) {
            console.log("Delete Animal Error", err);
        }
        else {
            console.log("Animal deleted!");
            res.redirect("/");
        }

    });
};

module.exports = showanimalsController;