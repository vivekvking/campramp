var express    = require('express'),
    app        = express(),
    mongoose   = require('mongoose'),
    bodyparser = require('body-parser')
    Campground = require('./models/campgrounds')
    Comment    = require('./models/comment')
    SeedDB     = require('./seed')
    User       = require('./models/user')
    passport   = require('passport')
    LocalStrategy = require('passport-local')
    passportLocalMongoose = require('passport-local-mongoose')
require('dotenv').config();
const port = process.env.PORT || 3000;
const uri = process.env.URI;
var campgroundRoutes = require('./routes/campgrounds')
    commentRoutes = require('./routes/comment')
    indexRoutes = require('./routes/index')    

app.use(require('express-session')({
    secret: "Life is beautiful",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use((req, res, next)=>{
    res.locals.currentuser = req.user;
    next();
});

// SeedDB();

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

mongoose.connect(uri,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(()=>{
    app.listen(port, ()=>{
        console.log("DB connected")
        console.log("Server has started at port = ",port)
    })
}).catch(err=>{
    console.log("DB connection failed ", err)
})     
