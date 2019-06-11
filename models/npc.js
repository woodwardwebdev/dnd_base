let mongoose = require("mongoose");

let npcSchema = new mongoose.Schema({
    name: String,
    location: String,
    description: String,
})

module.exports = mongoose.model("Npc", npcSchema);