const express = require("express");
const router = express.Router();
const Pc = require("../models/pc");

// PC's Section Routes

router.get('/', function(req, res){
    res.render('pcs');
})

router.get('/new', function(req, res){
    res.render('pcs/new');
})

router.get('/index', function(req, res){
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

router.post('/', function(req, res){
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

router.delete("/:id", function(req, res){
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


module.exports = router;
