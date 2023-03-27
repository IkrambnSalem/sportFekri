
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type:String,unique:true},
    password: String,
    role: String,
    newPassword:String
})

userSchema.plugin(uniqueValidator);
const user = mongoose.model("User", userSchema);

module.exports = user;