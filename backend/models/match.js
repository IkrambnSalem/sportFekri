// import mongoose module 
const mongoose = require("mongoose");
// pour faire le schema de const schema c une methode appartient a mongoose 
const matchschema = mongoose.Schema({
    scoreOne: Number,
    scoreTwo: Number,
    teamOne: String,
    teamTwo: String,
})
// create model pour le match par la methode de model qui appartient a mongoose on ecrit par la convention de PASCAL
const match = mongoose.model("Match", matchschema);

// make match exportable 
module.exports = match;