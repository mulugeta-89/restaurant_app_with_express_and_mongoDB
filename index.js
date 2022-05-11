const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dishRouter = require('./routes/dishRouter')
const dishRouterId = require("./routes/dishId")
const promotionsRouter = require('./routes/promotionsRouter')
const promotionsId = require("./routes/promotionsId")
const leadersRouter = require('./routes/leaderRouter')
const leadersId = require("./routes/leadersId")
const hostname = 'localhost'
const port = 3000
const app = express()

app.use("/leaders",leadersId)
app.use('/leaders',leadersRouter)
app.use("/promotions",promotionsId)
app.use("/promotions", promotionsRouter)
app.use("/dishes", dishRouterId)
app.use('/dishes',dishRouter)
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static(__dirname+"/public"))

const server = http.createServer(app)

server.listen(port,hostname, () => {
    console.log(`server is listening at http://${hostname}:${port}`)
})


