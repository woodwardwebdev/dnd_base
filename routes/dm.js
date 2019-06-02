const express = require("express");
const router = express.Router();

// DM portal routes

router.get('/', function(req, res){
    res.render('dm');       
})




module.exports = router;