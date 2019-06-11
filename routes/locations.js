// Index, New, Create, Show, Edit, Update, Destroy
const express = require("express");
const router = express.Router();
let Location = require('../models/location');

// Index Route
router.get('/', function(req, res){
    Location.find({}, function(err, foundlocations){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.render('locations', {locations: foundlocations});
        }
    })
})

// New Route
router.get('/new', function(req, res){
    res.render('locations/new');
})

// Create Route
router.post('/', function(req, res){
    Location.create({
    name: req.body.name,
    region: req.body.region,
    description: req.body.description
    }, function(err, createdlocation){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            req.flash('success', 'Location: "'+req.body.name+'" succesfully created');
            res.redirect('locations');
        }
    })
})

// Show route
router.get('/:id', function(req, res){
    Location.findById(req.params.id, function(err, foundlocation){
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
    Location.findById(req.params.id, function(err, foundlocation){
        if(err){
            console.log(err);
            req.flash('error', "Can't seem to find that one Jim, sorry");
            res.redirect('back')
        } else {
            res.render('locations/edit', {location: foundlocation});
        }
    })
})

// Update Route
router.put('/:id', function(req, res){
    Location.findByIdAndUpdate(req.params.id, function(err, updatedlocation){
        if(err){
            console.log(err);
            req.flash('error', "Seems to be some sort of problem, sorry!");
            res.redirect('back');
        } else {
            req.flash('success', 'successfully updated the location');
            res.redirect('locations/'+req.params.id);
        }
    })
})

// Destroy Route
router.delete('/:id', function(req, res){
    Location.findByIdAndDelete(req.params.id, function(err, deletedlocation){
        if(err){
            console.log(err);
            req.flash('error', "Seems to be some sort of problem, sorry!");
            res.redirect('back');
        } else {
            req.flash('success', 'successfully deleted the location');
            res.redirect('locations');
        }
    })
})



module.exports = router;