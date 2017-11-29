var mongoose = require('mongoose');
var pLMongoose  = require('passport-local-mongoose');

//Schema Setup
var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

userSchema.plugin(pLMongoose);

module.exports = mongoose.model('User', userSchema);