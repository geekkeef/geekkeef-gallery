
var mongoose = require('mongoose');

//Schema Setup
var gallerySchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    photographer: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Gallery', gallerySchema);