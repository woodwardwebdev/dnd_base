let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let request = require("request");
let mongoose = require("mongoose");
let flash = require('connect-flash');
let methodOverride = require('method-override');

let Pc = require('./models/pc.js')


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

app.use(function(req, res, next){
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.get('/', function(req, res){
    res.render('landing');
})

// PC's Section Routes

app.get('/pcs', function(req, res){
    res.render('pcs');
})

app.get('/pcs/create', function(req, res){
    res.render('pcs/create');
})




















app.listen(3000, function(){
    console.log("DnD-Base Server Is Up!")
})