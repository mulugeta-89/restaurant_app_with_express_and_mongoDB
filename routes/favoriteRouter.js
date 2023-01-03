const express = require('express')
const authenticate = require("../authenticate")
const Favorites = require("../models/favorite")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("./cors")
const favoriteRouter = express.Router()
favoriteRouter.use(bodyParser.json())
favoriteRouter.route("/")
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
        .populate('user')
        .populate("dishes.dish")
        .then((favorites) => {
                    res.statusCode = 200
                    res.setHeader("Content-Type", 'application/json')
                    res.json(favorites)
        }, (err) => next(err)).catch((err) => next(err))
    }, (err) => next(err))
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
        .populate('user')
        .populate("dishes")
        .then((favorite) => {
                if(favorite){
                    for(let i = 0; i < req.body.length; i++){
                        if(favorite.dishes.indexOf(req.body[i]._id) === -1){
                            favorite.dishes.push(req.body[i]._id)
                        }
                    }
                    favorite.save()
                    .then((favorite) => {
                        console.log("favorites", favorite)
                        res.statusCode = 200
                        res.setHeader("Content-Type", 'application/json')
                        res.json(favorite)
                    })
                }
                else {
                    Favorites.create({user: req.user._id, dishes: req.body})
                        .then((favorite) => {
                            console.log("favorite created", favorite)
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                        }, (err) => next(err))
                }
        }, (err) => next(err)).catch((err) => next(err))
})
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes")
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Favorites.findOneAndRemove({user: req.user._id})
        .then((favorite) => {
            console.log('deleted successfully')
            res.statusCode = 200
            res.setHeader("Content-Type", 'application/json')
            res.json(favorite)
        }, (err) => next(err)).catch((err) => next(err))
})


favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {res.sendStatus(200)})
.get(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 404;
    res.end("GET operation not supported on /favorite/dishId")
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user.id})
        .populate('user')
        .populate('dishes')
        .then((favorite) => {
            if(favorite){
                if(favorite.dishes.indexOf(req.params.dishId) === -1){
                    favorite.dishes.push(req.params.dishId)
                }
                favorite.save()
                .then((favorite) => {
                    console.log("fav added")
                    res.statusCode = 200
                    res.setHeader("Content-Type", 'application/json')
                    res.json(favorite)
                }, (err) => next(err))

            }
            else {
                Favorites.create({user: req.user._id, dishes: [req.params.dishId]})
                    .then((favorite) => {
                        res.statusCode = 200
                        res.setHeader("Content-Type", 'application/json')
                        res.json(favorite)
                    })
            }
        })
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes/dishId")
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
        .then((favorite) => {
            if(favorite){
                let index = favorite.dishes.indexOf(req.params.dishId)
                if(index >= 0){
                    favorite.dishes.splice(index, 1)
                    favorite.save()
                    .then((favorite) => {
                    console.log("Deleted succesfully", favorite)
                    res.statusCode = 200
                    res.setHeader("Content-Type", "application/json")
                    res.json(favorite)
                }, (err) => next(err))
                }
                
            }
            else {
                res.statusCode = 404
                res.setHeader("Content-Type", 'text/plain')
                res.send("favorite not found")
            }
        })
})
module.exports = favoriteRouter;