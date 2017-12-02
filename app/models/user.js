var mongoose = require('mongoose');
// var pLMongoose  = require('passport-local-mongoose');
var bcrypt = require('bcrypt-nodejs');

//Schema Setup
var userSchema = mongoose.Schema({
    username: String,
    password: String
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// userSchema.plugin(pLMongoose);

module.exports = mongoose.model('User', userSchema);