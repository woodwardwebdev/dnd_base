const express = require("express");
const router = express.Router();
const Pc = require("../models/pc");
const Item = require("../models/item");

// PC's Section Routes

router.get('/new', function(req, res){
    res.render('pcs/new');
})

router.get('/', function(req, res){
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

router.get('/:id', function(req, res){
    Pc.findById(req.params.id).populate('items').exec(function(err, foundpc){
        if(err){
            console.log(err);
            res.redirect('back');
        }
        else{
            res.render('pcs/show', {pc: foundpc});
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
