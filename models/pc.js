let mongoose = require("mongoose");

let pcSchema = new mongoose.Schema({
    playername: String,
    charactername: String,
    race: String,
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number,
    items: {},
    bio: String,
    image: String
});

module.exports = mongoose.model("PC", pcSchema);