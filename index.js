const express = require('express')
const http = require('http')


const hostname = 'localhost'
const port = 3000
const app = express()

const server = http.createServer(app)

app.use((req,res, next) => {
    console.log(req.headers)

    res.statusCode = 200
    res.setHeader("Content-type", "text/html")
    res.end("<html><body><h1>This is an express server</h1></body></html>")
})

server.listen(port,hostname, () => {
    console.log(`server is listening at http://${hostname}:${port}`)
})


