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

app.get('/pcs/new', function(req, res){
    res.render('pcs/new');
})

app.get('/pcs/index', function(req, res){
    Pc.find({}, function(err, foundpcs){
        if(err){
            console.log(err);
            res.render('back');
        }
        else {
            res.render('pcs/index', {pcs: foundpcs});
        }
    })
})

// create a new PC logic

app.post('/pcs', function(req, res){
    Pc.create({
        playername: req.body.playername,
        charactername: req.body.charactername,
        race: req.body.race,
        strength: req.body.str,
        dexterity: req.body.dex,
        constitution: req.body.con,
        intelligence: req.body.int,
        wisdom: req.body.wis,
        charisma: req.body.cha,
        bio: req.body.bio,
        image: req.body.image
    }, function(err, createdpc){
        if (err) {
            console.log(err);
            res.redirect('/');
        }
        else {
            console.log(createdpc);
            res.render('pcs');
        }
    });
});

app.delete("/pcs/:id", function(req, res){
    Pc.findByIdAndDelete(req.params.id, function(err, deletedPc){
        if (err){
            console.log(err);
            res.redirect('back');
        }
        else {
            res.redirect("back");
        }
    })
})

// DM portal routes

app.get('/dm', function(req, res){
    res.render('dm');       
})


















app.listen(3000, function(){
    console.log("DnD-Base Server Is Up!")
})