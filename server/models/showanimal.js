// Require mongoose
var mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');
var timestamps = require('mongoose-timestamp');

//Create new user registration
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email:String,
    password:String,
    login_attempt:{type:Number, default: 0 },
    start_block_time:{type:Date, default:''},
    end_block_time:{type:Date, default:''},
    isVerified:{type:Boolean, default:false },
    status:{type:Boolean, default:false },
    last_login:{type:Date,default:''},
    Created_at:{type: Date, default: Date.now}
});

//Create new schemas for category

var catSchema = new mongoose.Schema({
    category_name : String,
    description : String,
    status:Boolean,
    updated_at:{type: Date, default:Date.now}
});

var productSchema = new mongoose.Schema({
        productName: { type: String },
        sku: { type: String },
        description: { type: String, required: false },
        publish: { type: Boolean },
        categories:  { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        prices: {type : Number },
        quantity : {type : Number, default:''},
        images: String,
        modified: { type: Date, default: Date.now }
    });

// var products = new mongoose.Schema({
//     name: {
//         type: String,
//         default: ''
//     },
//     image: {
//         type: String,
//         default: ''
//     },
//     price: {
//         type: Number,
//         default: ''
//     },
//     mrp: {
//         type: Number,
//         default: ''
//     }
// })


var userSchema = new mongoose.Schema({
    name:String,
    username:String,
    email:String,
    password:String,
    image:String,
    admin:Boolean,
    isEmailVerified:Boolean,
    verifyEmailToken:String,
    verifyEmailTokenExpires:Date
});

var AgentSchema = new mongoose.Schema({
    username: {
        type: String,
        index: { unique: true }
    },
    password: String,
    created: {
        type: Date,
        required: true,
        default: new Date()
    }  
});

var adminSchema = new mongoose.Schema({
    name:String,
    email: {
            type: String,
            index: { unique: true }
            },
    password:String,
    last_login:{type:Date,default:''},
    Created_at:{type: Date, default: Date.now}
});

// Connect my collection and model schemas
userSchema.plugin(timestamps);
//products.plugin(mongoosePaginate);

mongoose.model("Admin", adminSchema);
mongoose.model("Agent", AgentSchema);
mongoose.model("Customer",userSchema);
mongoose.model("User", nameSchema);
mongoose.model("Category", catSchema);
mongoose.model("Product", productSchema);
//mongoose.model("Products", products);
