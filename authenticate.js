
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./model/users');

var jwtStrategy = require('passport-jwt').Strategy;
var extractjwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var config = require('./config');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey, { expiresIn: 3000 });
}

// var opts = {};
// opts.jwtFromRequest = extractjwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = config.secretKey;

// exports.jwtPassport = passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
//     console.log('jwt_payload', jwt_payload)
//     User.findOne({ _id: jwt_payload._id }, (err, user) => {
//         if (err) {
//             return done(err, false);
//         }
//         else if (user) {
//             return done(null, user);
//         }
//         else {
//             return done(null, false)
//         }
//     });
// }));

// exports.verifyUser = passport.authenticate('jwt', { session: false });




// Verifies sent token with authorization headers with secret keys

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters in this case headers is set to Authorization.
    var token = req.headers['authorization'];

    if (token) {
        // verifies with secret keys
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                req.decoded = decoded;
                console.log(decoded); // use this to log decoded items
                next();
            }
        });
    } else {
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

//Admin verification
exports.verifyAdmin = (req, res, next) => {
    if (req.decoded.admin = true) {
        next();
    } else {
        var err = new Error("You are not authorized to perform this operation!");
        err.status = 401;
        return next(err);
    }
}