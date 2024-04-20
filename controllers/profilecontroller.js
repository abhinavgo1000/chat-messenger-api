const mongodb = require('mongodb');
const Profile = require('../models/profile');

const objectId = mongodb.ObjectId;

exports.createProfile = (req, res) => {
    const dob = req.body.dob;
    const sex = req.body.sex;
    const address = req.body.address;
    const imgSrc = req.body.imgSrc;
    const imgAlt = req.body.imgAlt;
    const profile = new Profile(dob, sex, address, imgSrc, imgAlt);
    profile.save()
    .then(() => {
        console.log('profile created');
    })
    .catch((err) => {
        console.log(err);
    });
}

exports.fetchProfile = (req, res) => {
    const id = req.params.id;
    Profile.findById(id)
    .then((profile) => {
        res.send(profile);
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.fetchAllProfiles = (req, res) => {
    Profile.fetchAll()
    .then((profiles) => {
        res.send(profiles);
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.updateProfile = (req, res) => {
    const id = req.body.id;
    const dob = req.body.dob;
    const sex = req.body.sex;
    const address = req.body.address;
    const imgSrc = req.body.imgSrc;
    const imgAlt = req.body.imgAlt;
    const profile = new Profile(dob, sex, address, imgSrc, imgAlt, new objectId(id));
    profile.save()
    .then((res) => {
        console.log('profile updated');
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.deleteProfile = (req, res) => {
    const id = req.body.id;
    Profile.deleteById(id)
    .then(() => {
        console.log('profile deleted');
    })
    .catch((err) => {
        console.log(err);
    });
};
