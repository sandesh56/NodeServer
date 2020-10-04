const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promos = require('../model/promotions');
const authenticate = require('../authenticate');
const cors = require('./cors');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Promos.find({})
            .then((promo) => {
                console.log("Promotions found", promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch(err => {
                next(err);
            })
    })
    .post(cors.corsWithOptions, authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        Promos.create(req.body)
            .then((promo) => {
                console.log("Added ", promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch(err => {
                next(err)
            })
    })
    .put(cors.corsWithOptions, authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation is not supported');
    })
    .delete(cors.corsWithOptions, authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        Promos.deleteOne({})
            .then((promo) => {
                console.log("deleted");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .then(err => {
                next(err)
            })
    });

//FOR PROMOID

promoRouter.route('/:promoId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Promos.findById(req.params.promoId)
            .then((promo) => {
                console.log("Promotions found", promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch(err => {
                next(err);
            })
    })
    .post(cors.corsWithOptions, authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end("Doesnot support Post Operation on " + req.params.promoId);
    })
    .put(cors.corsWithOptions, authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        Promos.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, { new: true })
            .then((promo) => {
                console.log("Updated promotions : ", promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch(err => next(err))
    })
    .delete(cors.corsWithOptions, authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        Promos.findByIdAndRemove(req.params.promoId)
            .then((result) => {
                onsole.log("Deleted  : ", result);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            }, (err) => next(err))
            .catch(err => next(err))
    });

module.exports = promoRouter;