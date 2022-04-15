var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('../models/user')

router.get('/', function(req, res){
    res.render('home');
})

////////////////////REGISTER/////////////////////////
router.get('/register',(req, res)=>{
    res.render('register');
})

router.post('/register',function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err)
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect('/campgrounds')
        })
    })
})

//////////////////LOGIN/////////////////////////////
router.get('/login',(req, res)=>{
    res.render('login')
})

router.post('/login',passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}))

//////////////////LOGOUT/////////////////////////////
router.get('/logout', function(req, res){
    req.logOut();
    res.redirect('/');
})

module.exports = router;