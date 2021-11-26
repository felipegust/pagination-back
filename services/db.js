const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

require('dotenv').config()

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.5ahhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const dbName = process.env.DATABASE;

var _db;

const connectToServer = (callback) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
        assert.equal(null, err);
        console.log('Connected successfully to server');
        _db = client.db(dbName);
        return callback(err);
    })
};

const insertDocument = async function (collection, document) {
    return new Promise((resolve, reject) => {
        _db.collection(collection).insertOne(document).then(function (result) {
            resolve(result)
        })

    });
};

const findDocuments = async function (collection, limit = 0, offset = 0) {
    const result = await _db.collection(collection).find({}).sort({ _id: 1 }).skip(offset).limit(limit).toArray();
    return result
};

const countDocuments = async function (collection) {
    const count = await _db.collection(collection).countDocuments();
    return count
};

const updateDocument = function (collection, query, data) {
    return new Promise((resolve, reject) => {
        _db.collection(collection).updateOne(query, { $set: data }, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    });
};

const removeDocument = function (collection, query) {
    return new Promise((resolve, reject) => {
        _db.collection(collection).deleteOne(query, function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    countDocuments,
    connectToServer,
    insertDocument,
    findDocuments,
    updateDocument,
    removeDocument,
}