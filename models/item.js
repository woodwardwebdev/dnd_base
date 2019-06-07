let mongoose = require("mongoose");

let itemSchema = new mongoose.Schema({
    name: String,
    type: String,
    armortype: String,
    weapontype: String,
    rarity: String,
    traits: [],
    description: String,
    attunement: Boolean,
    currentOwner: [{type: mongoose.Schema.Types.ObjectId, ref: "currentOwner"}]
})

module.exports = mongoose.model("Item", itemSchema);