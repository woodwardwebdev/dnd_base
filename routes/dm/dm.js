// Index, New, Create, Show, Edit, Update, Destroy
const express = require("express");
const router = express.Router();
const DmLog = require('../../models/dmlog')

// DM portal routes

router.get('/', function(req, res){
    res.render('dm');       
})

// Index route - shows all logs
router.get('/log', function(req, res){
    DmLog.find({}, function(err, foundlogs){
        if(err){
            console.log(err);
            res.redirect('back');
        }
        else{
            res.render('dm/log', {logs: foundlogs});
        }
    })
})
// new route - shows create log form
router.get('/log/new', function(req, res){
    res.render('dm/log/new')
})
// create log logic
router.post('/log', function(req, res){
    DmLog.create({
        title: req.body.title,
        date: req.body.date,
        content: req.body.content
    }, function(err, createdlog){
        if(err){
            console.log(err);
            res.redirect('back');
        }
        else{
            console.log(createdlog);
            DmLog.find({}, function(err, foundlogs){
                if(err){
                    console.log(err);
                    res.redirect('back');
                }
                else{
                    req.flash("success", "New DM Log succesfully created.")
                    res.redirect('/dm/log');
                }
            })
        }
    })
})
// show route - shows one specific log
router.get('/log/:id', function(req, res){
    DmLog.findById(req.params.id, function(err, foundlog){
        if(err){
            console.log(err);
            res.redirect('back');
        }
        else{
            res.render('dm/log/show', {log: foundlog});
        }
    })
})
// delete logic
router.delete('/log/:id', function(req, res){
    DmLog.findByIdAndDelete(req.params.id, function(err, deletedlog){
        if(err){
            console.log(err);
            res.redirect('back');
        }
        else{
            req.flash("success", "DM Log: '"+deletedlog.title+"' succesfully deleted");
            res.redirect('/dm/log');
        }
    })
})
// edit route - shows the edit form for a specific log
router.get('/log/:id/edit', function(req, res){
    DmLog.findById(req.params.id, function(err, foundlog){
        if(err){
            console.log(err);
            res.redirect('back');
        }
        else{
            res.render('dm/log/edit', {log: foundlog});
        }
    })
})
// update logic
router.put('/log/:id', function(req, res){
    console.log(req.body);
    DmLog.findByIdAndUpdate(req.params.id, req.body, function(err, updatedlog){
        if(err){
            console.log(err);
            res.redirect('back');
        }
        else{
            req.flash("success", "Log Updated");
            res.redirect('/dm/log/'+req.params.id);
        }
    })
})

module.exports = router;