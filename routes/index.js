const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//Landing Page
router.get("/", (req, res) => {
    res.render("landing");
});

//=================
//Auth Routes
//=================

//show register form
router.get("/register", (req, res) => {
    res.render("register");
});
//handle sign up logic
router.post("/register", (req, res) => {
    User.register(
        new User({ username: req.body.username,email: req.body.email }),
        req.body.password,
        (err, iuser) => {
            if (err) {
                console.log(err);
                return res.render("register", { error: err.message });
            }
            passport.authenticate("local")(req, res, () => {
                req.flash("success", "Welcome to Yelpcamp, " + iuser.username + "!");
                res.redirect("/campgrounds");
            });
        }
    );
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/yelpCamp', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        // req.flash("success", "Welcome to blog site, " + user.username + "!");
        res.redirect('/campgrounds');
});

//show login form
router.get("/login", (req, res) => {
    res.render("login");
});
//handle login logic
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
    }),
    (req, res) => {}
);

//logout
router.get("/logout", (req, res) => {
    req.logOut();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

module.exports = router;
