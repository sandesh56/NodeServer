const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Leader = require('../model/leader');
const authenticate = require('../authenticate');
const cors = require('./cors');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Leader.find({})
            .then((leader) => {
                console.log("Promotions found", leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch(err => {
                next(err);
            })
    })
    .post(cors.corsWithOptions, authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        Leader.create(req.body)
            .then((leader) => {
                console.log("Added ", leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
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
        Leader.deleteOne({})
            .then((leader) => {
                console.log("deleted");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .then(err => {
                next(err)
            })
    });

//FOR PROMOID

leaderRouter.route('/:leaderId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Leader.findById(req.params.leaderId)
            .then((leader) => {
                console.log("Promotions found", leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch(err => {
                next(err);
            })
    })
    .post(cors.corsWithOptions, authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end("Doesnot support Post Operation on " + req.params.leaderId);
    })
    .put(cors.corsWithOptions, authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        Leader.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, { new: true })
            .then((leader) => {
                console.log("Updated promotions : ", leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch(err => next(err))
    })
    .delete(cors.corsWithOptions, authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
        Leader.findByIdAndRemove(req.params.leaderId)
            .then((result) => {
                onsole.log("Deleted  : ", result);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            }, (err) => next(err))
            .catch(err => next(err))
    });

module.exports = leaderRouter;