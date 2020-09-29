var express = require('express');
var router = express.Router();

const User = require('../model/users');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//POST OPERATION FOR USERNAME
router.post('/signup', (req, res, next) => {
  User.findOne({ username: req.body.username }) //searches database at first
    .then((user) => {
      if (user != null) {  //if already exists then throws error
        var err = new Error("Username " + req.body.username + " Already exists");
        err.status = 401;
        next(err);
      } else {  //if unique is true then add data on database
        return User.create({
          username: req.body.username,
          password: req.body.password
        })
      }
    })
    .then((user) => {  // returns status message
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ status: 'Registration Successful!', user: user })
    }, (err) => next(err))
    .catch((err) => next(err));
});

//LOGIN 

router.post('/login', (req, res, next) => {

  if (!req.session.user) {
    var authHeader = req.headers.authorization;

    if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }

    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];

    User.findOne({ username: username })
      .then((user) => {
        if (user === null) {
          var err = new Error('User ' + username + ' does not exist!');
          err.status = 403;
          return next(err);
        }
        else if (user.password !== password) {
          var err = new Error('Your password is incorrect!');
          err.status = 403;
          return next(err);
        }
        else if (user.username === username && user.password === password) {
          req.session.user = 'authenticated';
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('You are authenticated!')
        }
      })
      .catch((err) => next(err));
  }
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated!');
  }
})

//LOGOUT

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
