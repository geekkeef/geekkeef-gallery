var mongoose = require('mongoose');
var Gallery = require('./models/gallery');
var Comment = require('./models/comment');


var data = [
    {
        name: 'Gamer',
        image: 'http://geekkeef.com/assets/pix/ugur-akdemir-238673.jpg',
        description: 'Up, Down, Left, Right, B, A, START',
        photographer: 'Ugur Akdemir'
    },
    {
        name: 'Trooper',
        image: 'http://geekkeef.com/assets/pix/ciprian-boiciuc-193062.jpg',
        description: "These aren't the droids you're looking for",
        photographer: 'Ciprian Boiciuc'
    },
    {
        name: 'Jumpman',
        image: 'http://geekkeef.com/assets/pix/paul-volkmer-451300.jpg',
        description: "Your Airness",
        photographer: 'Paul Volkmer'
    },
    {
        name: 'Shiba Inu',
        image: 'http://geekkeef.com/assets/pix/alvaro-nino-67026.jpg',
        description: "Cutey McBear Face",
        photographer: 'Alvaro Nino'
    },
    {
        name: 'Tech Ninja',
        image: 'http://geekkeef.com/assets/pix/nordwood-themes-387855.jpg',
        description: "01001110 01101001 01101110 01101010 01100001 0001010",
        photographer: 'Nordwood'
    },
    {
        name: 'C-3PO',
        image: 'http://geekkeef.com/assets/pix/jens-johnsson-205843.jpg',
        description: "Oh My!",
        photographer: 'J.Johnsson'
    }
    
]
function seedDB(){
    Gallery.remove({}, function (err) {
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log('REMOVED GALLERY PHOTOS');
        //     data.forEach(function (seed) {
        //         Gallery.create(seed, function (err, photo) {
        //             if (err) {
        //                 console.log(err);
        //             } else {
        //                 console.log('ADDED PHOTO');

        //                 Comment.create({
        //                     text: "Dope",
        //                     author: "Geeks R Us"
        //                 }, function(err,comment){
        //                     if(err){
        //                         console.log(err);
        //                     }else{
        //                         photo.comments.push(comment);
        //                         photo.save();
        //                         console.log('CREATED NEW COMMENT');
        //                     }
                            
        //                 });
        //             }
        //         });
        //     });
        // }
    });
}

module.exports = seedDB;

