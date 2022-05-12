const mongoose = require('mongoose')
const Dishes = require("./models/dishes")

const url = "mongodb://127.0.0.1:27017/conFustion"
const connect = mongoose.connect(url)

connect.then((db) => {
    console.log("Connected correctly to server")
    Dishes.create({
        name: "Mulugeta",
        "description": "Student"
    }).then((dish) => {
            console.log(dish)
            return Dishes.findByIdAndUpdate(dish._id,{ $set: {description: "youtuber"} }, {
                    new: true
            }).exec()
        })
        .then((dish) => {
            console.log(dish)
            dish.comments.push({
               rating: 5,
               comment: "hello bababa how are you",
               author: "Leonardo di caprio"
            })

            return dish.save()
        }).then((dish) => {
                    console.log(dish)
                    return Dishes.remove({})
                }).then(() => {
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
})