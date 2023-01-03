const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Promotions = require("../models/promotions")
const authenticate = require("../authenticate")
const cors = require("./cors")
const promotionsRouter = express.Router()
promotionsRouter.use(bodyParser.json())

promotionsRouter.route("/")
.options(cors.corsWithOptions, (req, res) => (res.sendStatus(200)))
.get(cors.cors, (req,res,next) => {
    Promotions.find({})
        .then((promotions) => {
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.json(promotions)
        }, (err) => next(err)).catch((err) => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Promotions.create(req.body)
        .then((promotion) => {
            console.log("Promotions created succesfully!")
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.json(promotion)
        },(err) => next(err)).catch((err) => next(err))
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode = 403
    res.end("Put operation is not supported in the promotions")
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Promotions.remove({})
        .then((promotion) => {
            console.log("promotion deleted succesfully")
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.json(promotion)
        })
})

promotionsRouter.route('/:promotionId')
.options(cors.corsWithOptions, (req, res) => (res.sendStatus(200)))
.get(cors.cors, (req,res,next) => {
    Promotions.findById(req.params.promotionId)
        .then((promotion) => {
            res.statusCode = 200,
            res.setHeader("Content-Type", 'application/json')
            res.json(promotion)
        }, (err) => next(err)).catch((err) => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.promotionId)
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    Promotions.findByIdAndUpdate(req.params.promotionId, { $set: req.body}, {new: true})
        .then((promotion) => {
            res.statusCode = 200
            res.setHeader("Content-type", 'application/json')
            res.json(promotion)
        }, (err) => next(err)).catch((err) => next(err))

})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res, next) => {
    Promotions.findByIdAndRemove(req.params.promotionId)
        .then((resp) => {
            res.statusCode = 200
            res.setHeader("Content-type", "application/json")
            res.json(resp)
        }, (err) => next(err)).catch((err) => next(err))
})
module.exports = promotionsRouter;
