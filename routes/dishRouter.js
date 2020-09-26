const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Dishes = require('../model/dishes');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .get((req, res, next) => {
        Dishes.find({})
            .then((dishes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            }, (err) => next(err))
            .catch(err => next(err));
    })

    .post((req, res, next) => {
        Dishes.create(req.body)
            .then((dish) => {
                console.log("Created : ", dish);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch(err => next(err));
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('cannot be deployed a put operation');
    })

    .delete((req, res, next) => {
        Dishes.deleteOne({})
            .then((result) => {
                console.log("deleted");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            }, (err) => next(err))
            .catch(err => next(err));
    });


//FOR DISHID

dishRouter.route('/:DishId')
    .get((req, res, next) => {
        Dishes.findById(req.params.DishId)
            .then((dish) => {
                console.log("Found : ", dish);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("Doesnot support Post Operation on " + req.params.DishId);
    })
    .put((req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.DishId, {
            $set: req.body
        }, { new: true })
            .then((result) => {
                console.log("Updated : ", result);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            }, (err) => next(err))
            .catch(err => next(err));
    })

    .delete((req, res, next) => {
        Dishes.findByIdAndRemove(req.params.dishId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = dishRouter;