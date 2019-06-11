let mongoose = require("mongoose");

let locationSchema = new mongoose.Schema({
    name: String,
    region: String,
    description: String,
    npcs: [{type: mongoose.Schema.Types.ObjectId, ref: "Npc"}],
})

module.exports = mongoose.model("Location", locationSchema);