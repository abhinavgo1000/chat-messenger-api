const getDb = require('../utils/database').getDb;

class Message {
    constructor(message) {
        this.message = message;
    }

    save() {
        const db = getDb();
        return db.collection('messages').insertOne(this)
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('messages').find().toArray();
    }
}

module.exports = Message;
