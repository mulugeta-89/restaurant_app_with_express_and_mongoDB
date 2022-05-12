const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const dboper = require("./operations")

const url = 'mongodb://127.0.0.1:27017/'
const dbname = 'conFustion'

MongoClient.connect(url).then((client) => {

    console.log("connected correctly to the server");

    const db = client.db(dbname)
    dboper.insertDocument(db, {name: "mulugeta", "description": "student"}, 'dishes').then((result) => {
        console.log("Insert Document: \n", result.ops)

        return dboper.findDocuments(db, 'dishes').then((docs) => {
            console.log("Found Documents:\n", docs)
            
            return dboper.updateDocument(db, {name: "mulugeta"}, {"description": "youtuber"}, 'dishes').then((result) => {
                console.log("Updated Document: \n", result.result);
                return dboper.findDocuments(db, 'dishes').then((docs) => {
                    console.log("Found document ", docs)
                    
                    return db.dropCollection('dishes').then((result) => {
                        console.log("Dropped Collection " , result)
                        client.close();
                    })
                })
            })
        })
    }).catch((err) => console.log(err))
})
.catch((err) => console.log(err))