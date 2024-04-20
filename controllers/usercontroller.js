const mongodb = require('mongodb');
const User = require('../models/user');

const objectId = mongodb.ObjectId;

exports.createUser = (req, res) => {
    const profileName = req.body.profileName;
    const userName = req.body.userName;
    const telephone = req.body.telephone;
    const email = req.body.email;
    const password = req.body.password;
    const user = new User(profileName, userName, telephone, email, password);
    user.save()
    .then(() => {
        console.log('user created');
    })
    .catch((err) => {
        console.log(err);
    });
}

exports.fetchUser = (req, res) => {
    const id = req.params.id;
    User.findById(id)
    .then((user) => {
        res.send(user);
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.fetchAllUsers = (req, res) => {
    User.fetchAll()
    .then((users) => {
        res.send(users);
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.updateUser = (req, res) => {
    const id = req.body.id;
    const profileName = req.body.profileName;
    const userName = req.body.userName;
    const telephone = req.body.telephone;
    const email = req.body.email;
    const password = req.body.password;
    const user = new User(profileName, userName, telephone, email, password, new objectId(id));
    user.save()
    .then((res) => {
        console.log('user updated');
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.patchUser = (req, res) => {
    
};

exports.deleteUser = (req, res) => {
    const id = req.body.id;
    User.deleteById(id)
    .then(() => {
        console.log('user deleted');
    })
    .catch((err) => {
        console.log(err);
    });
};
