const express = require("express")
const bodyParser = require("body-parser")

const leadersRouter  = express.Router()
leadersRouter.use(bodyParser.json())

leadersRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", 'text/plain')
    next();
})
.get((req,res,next) => {
    res.end("Will send the all leaders to you!")

})
.post((req,res,next) => {
    res.end("Will add the leaders " + req.body.name + ' with details ' + req.body.description)
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /leaders")
})
.delete((req,res,next) => {
    res.end("Deleting all the leaders")
})

module.exports = leadersRouter;