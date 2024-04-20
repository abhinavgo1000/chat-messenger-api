const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

const objectId = mongodb.ObjectId;

class Profile {
    constructor(dob, sex, address, imgSrc, imgAlt, id) {
        this.dob = dob;
        this.sex = sex;
        this.address = address;
        this.imgSrc = imgSrc;
        this.imgAlt = imgAlt;
        this._id = id ? new objectId(id) : null;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('profiles').updateOne({_id: this._id}, {$set: this});
        } else {
            dbOp = db.collection('profiles').insertOne(this);
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
        return db.collection('profiles').find().toArray()
        .then((profiles) => {
            console.log(profiles);
            return profiles;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    static findById(profileId) {
        const db = getDb();
        return db.collection('profiles').find({_id: new objectId(profileId)}).next()
        .then((profile) => {
            console.log(profile);
            return profile;
        })
        .catch((err) => {
            console.log(err);
        })
    }

    static deleteById(profileId) {
        const db = getDb();
        return db.collection('profiles').deleteOne({_id: new objectId(profileId)})
        .then((result) => {
            console.log('profile deleted')
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

module.exports = Profile;
