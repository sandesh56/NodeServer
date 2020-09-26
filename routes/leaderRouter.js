const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next()
    })
    .get((req, res, next) => {
        res.end("will send all the details of leader to you");
    })
    .post((req, res, next) => {
        res.end("will add the leader " + req.body.name + " with detail " + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('cannot be deployed a put operation');
    })
    .delete((req, res, next) => {
        res.end('Deleting all the leader...');
    });


//FOR DISHID

leaderRouter.route('/:leaderId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next()
    })
    .get((req, res, next) => {
        res.end("will send all the leader to you");
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("Doesnot support Post Operation on " + req.params.leaderId);
    })
    .put((req, res, next) => {
        res.write('Updating.....' + req.params.leaderId)
        res.end('updating' + req.body.name + 'with description : ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting the leader...');
    });

module.exports = leaderRouter;