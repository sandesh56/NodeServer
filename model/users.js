const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    facebookId: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    }

});
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);

module.exports = User;