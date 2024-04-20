const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

const objectId = mongodb.ObjectId;

class User {
    constructor(profileName, userName, telephone, email, password, id, userId) {
        this.profileName = profileName;
        this.userName = userName;
        this.telephone = telephone;
        this.email = email;
        this.password = password;
        this._id = id ? new objectId(id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('users').updateOne({_id: this._id}, {$set: this});
        } else {
            dbOp = db.collection('users').insertOne(this);
        }
        return dbOp
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('users').find().toArray()
        .then((users) => {
            console.log(users);
            return users;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').find({_id: new objectId(userId)}).next()
        .then((user) => {
            console.log(user);
            return user;
        })
        .catch((err) => {
            console.log(err);
        })
    }

    static deleteById(userId) {
        const db = getDb();
        return db.collection('users').deleteOne({_id: new objectId(userId)})
        .then((result) => {
            console.log('user deleted')
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

module.exports = User;
