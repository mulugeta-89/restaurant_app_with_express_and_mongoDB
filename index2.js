const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations')

const url = 'mongodb://127.0.0.1:27017/';
const dbname = 'conFustion';

MongoClient.connect(url).then((client) => {
    const db = client.db(dbname)

    dboper.insertDocument(db, {"name": "Mulugeta", "description":"student"}, "dishes").then((result) => {
        console.log("Inserted Document" + result.ops)
        return dboper.findDocuments(db, 'dishes')
    }).then((docs) => {
        console.log("found document" + docs)
        return dboper.updateDocument(db, {"name":"Mulugeta"}, {"description": "youtuber"}, 'dishes')
    }).then((result) => {
        console.log("update document" + result.result)
        return dboper.findDocuments(db, 'dishes')
    }).then((docs) => {
        console.log("updated document" + docs)
        return db.dropCollection('dishes')
    }).then((result) => {
        console.log("dropped collection" + result)
    }).catch((err) => console.log(err))
}).catch((err) => console.log(err))