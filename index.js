const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const dishRouter = require('./routes/dishRouter')
const promotionsRouter = require('./routes/promoRouter')
const leadersRouter = require('./routes/leaderRouter')

const hostname = 'localhost'
const port = 3000
const app = express()

app.use('/dishes',dishRouter)
app.use("/promotions", promotionsRouter)
app.use('/leaders',leadersRouter)


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static(__dirname+"/public"))

const server = http.createServer(app)

server.listen(port,hostname, () => {
    console.log(`server is listening at http://${hostname}:${port}`)
})


