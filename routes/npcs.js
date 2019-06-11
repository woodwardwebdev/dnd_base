const express = require("express");
const router = express.Router();
const Npc = require("../models/npc.js");

// Index, New, Create, Show, Edit, Update, Destroy


// Index Route
router.get('/', function(req, res){
    Npc.find({}, function(err, foundnpcs){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.render('npcs', {locations: foundnpcs});
        }
    })
})

// New Route
router.get('/new', function(req, res){
    res.render('npcs/new');
})

// Create Route
router.post('/', function(req, res){
    Npc.create({

    }, function(err, creatednpc){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            req.flash('success', 'NPC: "'+req.body.name+'" succesfully created');
            res.redirect('npcs');
        }
    })
})

// Show route
router.get('/:id', function(req, res){
    Npc.findById(req.params.id, function(err, foundnpc){
        if(err){
            console.log(err);
            req.flash('error', "Can't seem to find that one Jim, sorry");
            res.redirect('back')
        } else {
            res.render('locations/show', {location: foundlocation});
        }
    })
})

// Edit Route
router.get('/:id/edit', function(req, res){
    Npc.findById(req.params.id, function(err, foundnpc){
        if(err){
            console.log(err);
            req.flash('error', "Can't seem to find that one Jim, sorry");
            res.redirect('back')
        } else {
            res.render('npcs/edit', {npc: foundnpc});
        }
    })
})

// Update Route
router.put('/:id', function(req, res){
    Npc.findByIdAndUpdate(req.params.id, function(err, updatednpc){
        if(err){
            console.log(err);
            req.flash('error', "Seems to be some sort of problem, sorry!");
            res.redirect('back');
        } else {
            req.flash('success', 'successfully updated the NPC');
            res.redirect('npcs/'+req.params.id);
        }
    })
})

// Destroy Route
router.delete('/:id', function(req, res){
    Npc.findByIdAndDelete(req.params.id, function(err, deletednpc){
        if(err){
            console.log(err);
            req.flash('error', "Seems to be some sort of problem, sorry!");
            res.redirect('back');
        } else {
            req.flash('success', 'successfully deleted the NPC');
            res.redirect('npcs');
        }
    })
})

module.exports = router;