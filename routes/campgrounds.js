const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");

//Index Route
router.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds,
            });
        }
    });
});

//NEW Route - show form
router.get("/campgrounds/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});
//Create - Add new campground to db
router.post("/campgrounds", middleware.isLoggedIn, (req, res) => {
    //get data from form and add to campgrounds
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username,
    };
    const newCampground = {
        name: name,
        image: image,
        desc: desc,
        author: author,
    };
    //create a new campground and save to mongodb
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            //redirect to campgrounds
            res.redirect("/campgrounds");
        }
    });
});

//Show more info about campgrounds
router.get("/campgrounds/:id", (req, res) => {
    //find campgrounds by provided id
    Campground.findById(req.params.id)
        .populate("comments")
        .exec(function (err, foundCampground) {
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/show", { campground: foundCampground });
            }
        });
});

//EDIT campground Route
router.get(
    "/campgrounds/:id/edit",
    middleware.checkCampgroundOwner,
    (req, res) => {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                res.redirect("/campgrounds");
            } else {
                res.render("campgrounds/edit", { campground: foundCampground });
            }
        });
    }
);
//UPDATE campground Route
router.put("/campgrounds/:id", middleware.checkCampgroundOwner, (req, res) => {
    Campground.findByIdAndUpdate(
        req.params.id,
        req.body.campground,
        (err, updatedCampground) => {
            if (err) {
                res.redirect("/campgrounds");
            } else {
                res.redirect("/campgrounds/" + req.params.id);
            }
        }
    );
});

//DESTROY Route
router.delete(
    "/campgrounds/:id",
    middleware.checkCampgroundOwner,
    (req, res) => {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                res.redirect("/campgrounds");
            } else {
                foundCampground.comments.forEach((id) => {
                    Comment.findByIdAndRemove(id, (err) => {
                        if (err) {
                            res.redirect("/campgrounds");
                        }
                    });
                });
            }
        });
        Campground.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.redirect("/campgrounds");
            } else {
                res.redirect("/campgrounds");
            }
        });
    }
);

module.exports = router;
