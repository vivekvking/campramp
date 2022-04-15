var express = require('express')
var router = express.Router()
var Campground = require('../models/campgrounds')

/////////////////////INDEX//////////////////////
router.get('/campgrounds', function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err)
        }else{
            res.render('index', {campgrounds: campgrounds});
        }
    });
})

////////////////////NEW//////////////////////////
router.get('/campgrounds/new',function(req, res){
    res.render('new');
})

///////////////////CREATE////////////////////////
router.post('/campgrounds',function(req, res){
    Campground.create({
        name: req.body.namen,
        image: req.body.imagen,   
        description: req.body.descriptionn  
    }); 
    res.redirect('/campgrounds'); 
})

////////////////////SHOW/////////////////////////
router.get('/campgrounds/:ID', function(req, res){
    Campground.findById(req.params.ID).populate("comments").exec(function(err, foundcamp){
        if(err){
            console.log(err)
        }else{
            res.render('show',{campground: foundcamp})
        }
    })
})

module.exports = router;
