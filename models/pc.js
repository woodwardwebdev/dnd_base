let mongoose = require("mongoose");

let statsSchema = new mongoose.Schema({
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number
})

let pcSchema = new mongoose.Schema({
    name: String,
    race: String,
    stats: statsSchema,
    items: {},
    bio: String,
    image: String
});

module.exports = mongoose.model("PC", pcSchema);