const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");

//COMMENTS-NEW
router.get(
    "/campgrounds/:id/comments/new",
    middleware.isLoggedIn,
    (req, res) => {
        //find campground
        Campground.findById(req.params.id, (err, campground) => {
            if (err) {
                console.log(err);
            } else {
                res.render("comments/new", { campground: campground });
            }
        });
    }
);

//Comments - create
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//COMMENTS EDIT ROUTE
router.get(
    "/campgrounds/:id/comments/:c_id/edit",
    middleware.checkCommentOwner,
    (req, res) => {
        Comment.findById(req.params.c_id, (err, foundComment) => {
            if (err) {
                res.redirect("back");
            } else {
                res.render("comments/edit", {
                    campground_id: req.params.id,
                    comment: foundComment,
                });
            }
        });
    }
);
//COMMENTS UPDATE ROUTE
router.put(
    "/campgrounds/:id/comments/:c_id",
    middleware.checkCommentOwner,
    (req, res) => {
        Comment.findByIdAndUpdate(
            req.params.c_id,
            req.body.comment,
            (err, updatedComment) => {
                if (err) {
                    res.redirect("back");
                } else {
                    res.redirect("/campgrounds/" + req.params.id);
                }
            }
        );
    }
);
//COMMENTS DESTROY ROUTE
router.delete(
    "/campgrounds/:id/comments/:c_id",
    middleware.checkCommentOwner,
    (req, res) => {
        Comment.findByIdAndRemove(req.params.c_id, (err) => {
            if (err) {
                res.redirect("back");
            } else {
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
    }
);

module.exports = router;
