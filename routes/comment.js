var express = require('express')
var router = express.Router()
var Campground = require('../models/campgrounds')
var Comment = require('../models/comment')

///////////////////COMMENT///////////////////////
router.get('/campgrounds/:ID/comment/new',isLoggedIn, function(req, res){
    res.render('newcomment',{ID: req.params.ID});
})

router.post('/campgrounds/:ID/comment',isLoggedIn, function(req, res){
    Campground.findById(req.params.ID, function(err, foundcamp){
        if(err){
            console.log(err)
        }else{
            Comment.create(req.body.comment,function(err, comment){
                if(err){
                    console.log(err)
                }
                foundcamp.comments.push(comment);
                foundcamp.save();
            })
            res.redirect('/campgrounds/'+req.params.ID);
        }
    })
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;