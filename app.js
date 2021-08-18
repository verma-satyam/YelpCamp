//Variable Setup
const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const User = require("./models/user");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");
const flash = require("connect-flash");
require('dotenv').config();
//Requiring Routes
const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");
const indexRoutes = require("./routes/index");

//Mongoose Setup
const db = require('./config/db');
db();
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

//App setup
app.use(bodyParse.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());

//SCHEMA SETUP
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const seedDB = require("./seeds");
const campground = require("./models/campground");

//Delete and make new entries in db
//seedDB();

//PASSPORT config
app.use(
    require("express-session")({
        secret: "My name is Satyam",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/yelpCamp",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ email:profile.emails[0].value }, function (err, user) {
            user.username = profile.displayName;
            user.googleId =  profile.id;
            user.save();
        return cb(err, user);
        });
    }
));

//Middleware - providing currentUser to every route
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//REQUIRE ROUTES
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

//SHOW - shows more info about one campgrounds
app.listen(3000, () => {
    console.log("YelpCamp Server has started");
});
