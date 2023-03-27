const mongoose = require("mongoose");
const teamSchema = mongoose.Schema({
    teamName: String,
    teamStadium: String,
    teamOwner: String,
    teamFoundation: Number,
})

const team = mongoose.model("Team", teamSchema);
module.exports = team;
