var Admin = require("../controllers/admin.js");

var showanimals = require("../controllers/user.js");

// Pass routes from this file to app.js
module.exports = function(app) {
    
    // Admin Login page
    app.get("/", (req, res) => {
        Admin.adminLoginform(req, res);
    });

    //Admin Signup Page
    app.get("/AdminSignUp", function(req, res) {
        Admin.adminform(req, res);
    });

    // Route to add admin to DB
    app.post("/adminSignup", (req, res) => {
        Admin.addAdmin(req, res);
    });

    //Route to check login
    app.post("/adminlogin", function(req, res) {
        Admin.adminlogin(req, res);
    });

    //Route for show view profile
    app.get("/profile", function(req, res) {
        Admin.profile(req, res);
    });

    

}