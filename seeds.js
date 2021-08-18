const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

// const data = [
//     {
//         name: "Cloud's Rest",
//         image:
//             "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//         desc:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate commodi officia architecto deleniti reprehenderit est veritatis, beatae dolore nostrum nulla accusantium illum iusto perspiciatis voluptas ducimus adipisci expedita ullam, ex minus iste fugiat? Ipsam itaque culpa nesciunt voluptate. Aperiam quibusdam officiis distinctio dolores possimus sunt nulla laudantium perferendis blanditiis non dicta tenetur cum dignissimos exercitationem, obcaecati, molestias asperiores doloribus deserunt minima velit labore voluptates excepturi delectus. Aperiam beatae doloribus animi ea nisi ratione reprehenderit eius eos ad dolorem distinctio, provident voluptatibus quo inventore iusto? Repellendus, sed tenetur culpa totam ipsam, minima delectus vero odio nisi corrupti adipisci, voluptatibus sint error magni? Suscipit, est provident. Cupiditate soluta rerum illum quod voluptate accusantium fugiat quo repellendus facilis? Unde sapiente non quae cum aliquid natus quidem.",
//     },
//     {
//         name: "Skyyy",
//         image:
//             "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=649&q=80",
//         desc:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate commodi officia architecto deleniti reprehenderit est veritatis, beatae dolore nostrum nulla accusantium illum iusto perspiciatis voluptas ducimus adipisci expedita ullam, ex minus iste fugiat? Ipsam itaque culpa nesciunt voluptate. Aperiam quibusdam officiis distinctio dolores possimus sunt nulla laudantium perferendis blanditiis non dicta tenetur cum dignissimos exercitationem, obcaecati, molestias asperiores doloribus deserunt minima velit labore voluptates excepturi delectus. Aperiam beatae doloribus animi ea nisi ratione reprehenderit eius eos ad dolorem distinctio, provident voluptatibus quo inventore iusto? Repellendus, sed tenetur culpa totam ipsam, minima delectus vero odio nisi corrupti adipisci, voluptatibus sint error magni? Suscipit, est provident. Cupiditate soluta rerum illum quod voluptate accusantium fugiat quo repellendus facilis? Unde sapiente non quae cum aliquid natus quidem.",
//     },
//     {
//         name: "Nighting Light",
//         image:
//             "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//         desc:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate commodi officia architecto deleniti reprehenderit est veritatis, beatae dolore nostrum nulla accusantium illum iusto perspiciatis voluptas ducimus adipisci expedita ullam, ex minus iste fugiat? Ipsam itaque culpa nesciunt voluptate. Aperiam quibusdam officiis distinctio dolores possimus sunt nulla laudantium perferendis blanditiis non dicta tenetur cum dignissimos exercitationem, obcaecati, molestias asperiores doloribus deserunt minima velit labore voluptates excepturi delectus. Aperiam beatae doloribus animi ea nisi ratione reprehenderit eius eos ad dolorem distinctio, provident voluptatibus quo inventore iusto? Repellendus, sed tenetur culpa totam ipsam, minima delectus vero odio nisi corrupti adipisci, voluptatibus sint error magni? Suscipit, est provident. Cupiditate soluta rerum illum quod voluptate accusantium fugiat quo repellendus facilis? Unde sapiente non quae cum aliquid natus quidem.",
//     },
//     {
//         name: "Sunshine Beauti",
//         image:
//             "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
//         desc:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate commodi officia architecto deleniti reprehenderit est veritatis, beatae dolore nostrum nulla accusantium illum iusto perspiciatis voluptas ducimus adipisci expedita ullam, ex minus iste fugiat? Ipsam itaque culpa nesciunt voluptate. Aperiam quibusdam officiis distinctio dolores possimus sunt nulla laudantium perferendis blanditiis non dicta tenetur cum dignissimos exercitationem, obcaecati, molestias asperiores doloribus deserunt minima velit labore voluptates excepturi delectus. Aperiam beatae doloribus animi ea nisi ratione reprehenderit eius eos ad dolorem distinctio, provident voluptatibus quo inventore iusto? Repellendus, sed tenetur culpa totam ipsam, minima delectus vero odio nisi corrupti adipisci, voluptatibus sint error magni? Suscipit, est provident. Cupiditate soluta rerum illum quod voluptate accusantium fugiat quo repellendus facilis? Unde sapiente non quae cum aliquid natus quidem.",
//     },
// ];
const seedDB = () => {
    //REMOVE ALL CAMPGROUNDS
    Campground.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("REMOVED CAMPGROUNDS");
        //ADD A FEW CAMPGROUNDS
        // data.forEach((seed) => {
        //     Campground.create(seed, (err, campground) => {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log("Added a Campground");
        //             // create a comment
        //             Comment.create(
        //                 {
        //                     text: "This place is great",
        //                     author: "Homer",
        //                 },
        //                 (err, comment) => {
        //                     if (err) {
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Created new comment");
        //                     }
        //                 }
        //             );
        //         }
        //     });
        // });
    });
};

module.exports = seedDB;
