const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const dboper = require("./operations")

const url = 'mongodb://127.0.0.1:27017/'
const dbname = 'conFustion'

MongoClient.connect(url, (err,client) => {
    assert.equal(err, null);

    console.log("connected correctly to the server");

    const db = client.db(dbname)
    dboper.insertDocument(db, {name: "mulugeta", "description": "student"}, 'dishes', (result) => {
        console.log("Insert Document: \n", result.ops)

        dboper.findDocuments(db, 'dishes', (docs) => {
            console.log("Found Documents:\n", docs)
            dboper.updateDocument(db, {name: "mulugeta"}, {"description": "farmmer"}, 'dishes', (result) => {
                console.log("Updated Document: \n", result.result);
                dboper.findDocuments(db, 'dishes', (docs) => {
                    console.log("Found document ", docs)
                    
                    db.dropCollection('dishes', (result) => {
                        console.log("Dropped Collection " , result)
                        client.close();
                    })
                })
            })
        })
    })
})