const mongoose = require('mongoose')
const Dishes = require("./models/dishes")

const url = "mongodb://127.0.0.1:27017/conFustion"
const connect = mongoose.connect(url)

connect.then((db) => {
    console.log("Connected correctly to server")
    let newDish = Dishes({
        name: "Mulugeta",
        "description": "Student"
    })
    newDish.save()
        .then((dish) => {
            console.log(dish)
            return Dishes.find({}).exec()
        })
        .then((dishes) => {
            console.log(dishes)
            return Dishes.remove({})
        })
        .then(() => {
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
})