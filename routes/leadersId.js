const express = require("express")
const bodyParser = require("body-parser")

const leadersId = express.Router()
leadersId.use(bodyParser.json())

leadersId.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain")
    next()
})
.get((req,res,next) => {
    res.end("Will send details of the promotion: " + req.params.leaderId + " to you!")

})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.leaderId)
})
.put((req,res,next) => {
    res.write("Updating the dish: " + req.params.leaderId + '\n')
    res.end("Will update the dish: " + req.body.name + " with details " + req.body.description)

})
.delete((req,res, next) => {
    res.end("Deleting dish: " + req.params.leaderId)
})
module.exports = leadersId;