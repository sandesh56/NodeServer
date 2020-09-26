const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next()
    })
    .get((req, res, next) => {
        res.end("will send all the Promotion to you");
    })
    .post((req, res, next) => {
        res.end("will add the promotion " + req.body.name + " with detail " + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('cannot be deployed a put operation');
    })
    .delete((req, res, next) => {
        res.end('Deleting all the Promotion...');
    });

//FOR DISHID

promoRouter.route('/:promoId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next()
    })
    .get((req, res, next) => {
        res.end("will send all the promo to you");
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("Doesnot support Post Operation on " + req.params.promoId);
    })
    .put((req, res, next) => {
        res.write('Updating.....' + req.params.promoId)
        res.end('updating' + req.body.name + 'with description : ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting the Promotions...');
    });

module.exports = promoRouter;