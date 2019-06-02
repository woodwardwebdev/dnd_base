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
    items: [{type: mongoose.Schema.Types.ObjectId, ref: "item"}],
    bio: String,
    image: String
});

module.exports = mongoose.model("PC", pcSchema);