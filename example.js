const express = require('express')
const authenticate = require('./authenticate')
const bodyParser = require('body-parser')
const multer = require('multer')

const uploadRouter = express.Router()
uploadRouter.use(bodyParser.json())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb( new Error("You can upload only image files"), false)
    }
    cb(null, true)
}

const upload = multer({storage: storage, fileFilter: imageFileFilter})

uploadRouter.route('/')
.get((req, res, next) => {
    res.statusCode = 403
    res.setHeader("Content-Type", 'text/plain')
    res.send("the GET operation is not available ")
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'),(req, res, next) => {
    res.statusCode = 200
    res.setHeader("Content-Type", 'application/json')
    res.json(req.file)
})
.put((req, res, next) => {
    res.statusCode = 403
    res.setHeader("Content-Type", 'text/plain')
    res.send("the GET operation is not available ")
})
.delete((req, res, next) => {
    res.statusCode = 403
    res.setHeader("Content-Type", 'text/plain')
    res.send("the GET operation is not available ")
})

module.exports = uploadRouter