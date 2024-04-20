const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://abhinavgl:pVAzCVdC9CBoCksv@cluster0.atsxdhb.mongodb.net/messenger?retryWrites=true&w=majority&appName=Cluster0')
    .then((client) => {
        console.log('connected to db.');
        _db = client.db();
        callback(client);
    })
    .catch((err) => {
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
