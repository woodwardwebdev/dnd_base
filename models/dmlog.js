let mongoose = require("mongoose");

let dmlogSchema = new mongoose.Schema({
    title: String,
    date: {
        type: Date,
        default: new Date().toISOString().slice(0, 10)
    },
    content: String
})

module.exports = mongoose.model("DmLog", dmlogSchema);