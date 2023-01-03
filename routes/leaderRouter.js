const express = require("express")
const bodyParser = require("body-parser")
const Leaders = require("../models/leaders")
const mongoose = require('mongoose')
const authenticate = require("../authenticate")
const cors = require("./cors")
const leadersRouter  = express.Router()
leadersRouter.use(bodyParser.json())


leadersRouter.route('/')
.options(cors.corsWithOptions, (req, res) => (res.sendStatus(200)))
.get(cors.cors, (req,res,next) => {
    Leaders.find({})
        .then((leaders) => {
            res.statusCode = 200,
            res.setHeader("Content-Type", 'application/json')
            res.json(leaders)
        }, (err) => next(err)).catch((err) => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Leaders.create(req.body)
        .then((leader) => {
            console.log("Leaders created succesfully")
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.json(leader)
        })
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /leaders")
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Leaders.remove({})
        .then((leader) => {
            console.log("leaders deleted successfully")
            res.statusCode = 200
            res.setHeader("Content-Type","appliation/json")
            res.json(leader)
        }, (err) => next(err)).catch((err) => next(err))
})

leadersRouter.route('/:leaderId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors, (req,res,next) => {
    Leaders.findById(req.params.leaderId)
        .then((leader) => {
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.json(leader)
        }, (err) => next(err)).catch((err) => next(err))

})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.leaderId)
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, { $set: req.body}, { new: true})
        .then((leader) => {
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.json(leader)
        }, (err) => next(err)).catch((err) => next(err))

})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req,res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
        .then((resp) => {
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.json(resp)
        }, (err) => next(err)).catch((err) => next(err))
})
module.exports = leadersRouter;


