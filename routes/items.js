const express = require("express");
const router = express.Router();
const Pc = require("../models/pc");
const Item = require("../models/item");

router.get('/', function(req, res){
    res.render('items/index')
})

router.get('/new', function(req, res){
    Pc.find({}, function(err, foundPcs){
        if(err){
            console.log(err);
            res.redirect('back');
        }
        else{
            res.render('items/new', {Pcs: foundPcs});
        }
    })
})


module.exports = router;