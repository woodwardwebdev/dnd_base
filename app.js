const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const flash = require('connect-flash');
const methodOverride = require('method-override');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User        = require("./models/user");

const pcsRoutes = require('./routes/pcs'); 
const npcsRoutes = require('./routes/npcs');
const locationsRoutes = require('./routes/locations');
const itemsRoutes = require('./routes/items');
const dmRoutes = require('./routes/dm/dm');


mongoose.connect("mongodb://localhost/dnd_base", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");


app.use(require("express-session")({
    secret: "potatoes, always",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passes current user info to each page - needs to be after the passport config

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use("/pcs", pcsRoutes);
app.use("/npcs", npcsRoutes);
app.use("/locations", locationsRoutes);
app.use("/items", itemsRoutes);
app.use("/dm", dmRoutes);

app.get('/', function(req, res){
    res.render('landing');
})

app.listen(3000, function(){
    console.log("DnD-Base Server Is Up!")
})