const mongoose= require ("mongoose");
const playerSchema =mongoose.Schema({
    Name:String,
    age:Number,
    position:Number,
    nbr:Number,
})

const player= mongoose.model("Player",playerSchema);

module.exports=player;