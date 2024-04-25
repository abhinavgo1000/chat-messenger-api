const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.createUser = (req, res) => {
    const profileName = req.body.profileName;
    const userName = req.body.userName;
    const telephone = req.body.telephone;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    return bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
        const user = new User({
            profileName: profileName,
            userName: userName,
            telephone: telephone,
            email: email,
            password: hashedPassword,
            profile: {
                items: []
            },
            message: {
                items: []
            }
        }); 
        return user.save();
    })
    .then(() => {
        console.log('user created');
    })
    .catch((err) => {
        console.log(err);
    });
};

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
    User.find()
    .then((users) => {
        res.send(users);
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.getUpdateUser = (req, res) => {
    const editMode = req.query.edit;
    const userId = req.params.userId;
    User.findById(userId)
    .then((user) => {
        if (editMode) {
            res.send(user);
        }
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.updateUser = (req, res) => {
    const userId = req.body.userId;
    const profileName = req.body.profileName;
    const userName = req.body.userName;
    const telephone = req.body.telephone;
    const email = req.body.email;
    const password = req.body.password;
    User.findById(userId).then((user) => {
        user.profileName = profileName;
        user.userName = userName;
        user.telephone = telephone;
        user.email = email;
        user.password = password;
        return user.save();
    })   
    .then(() => {
        console.log('user updated');
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.deleteUser = (req, res) => {
    const userId = req.body.userId;
    User.findByIdAndDelete(userId)
    .then(() => {
        console.log('user deleted');
    })
    .catch((err) => {
        console.log(err);
    });
};
