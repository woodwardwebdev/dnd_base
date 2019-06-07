let mongoose = require("mongoose")
let passportLocalMongoose = require("passport-local-mongoose")

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    isdm: Boolean
});

userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User", userSchema);