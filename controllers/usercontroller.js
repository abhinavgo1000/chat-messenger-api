const User = require('../models/user');

exports.createUser = (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    User.create({
        userName: userName,
        email: email,
        password: password
    })
    .then(() => {
        console.log('user created');
    })
    .catch((err) => {
        console.log(err);
    });
}

exports.fetchUser = (req, res) => {
    User.findAll()
    .then((users) => {
        res.send(users);
    })
    .catch((err) => {
        console.log(err);
    });
}
