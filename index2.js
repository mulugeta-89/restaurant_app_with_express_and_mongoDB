const mongoose = require('mongoose')
const Dishes  = require('./models/dishes2')

const url = "mongodb://127.0.0.1:27017/conFustion"
const connect = mongoose.connect(url)
connect.then((db) => {
    console.log("Connected succesfully to the server")
    let newDish = Dishes({
        name: "kebede",
        description: "farmer"
    })
    newDish.save()
        .then((dish) => {
            console.log(dish)
            return Dishes.find({}).exec()
        }).then((dishes) => {
            console.log(dishes)
            return Dishes.remove()
        }).then(() => {
            mongoose.connection.close()
        }).catch((err) => console.log(err))
})