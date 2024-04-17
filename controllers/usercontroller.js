const User = require('../models/user');

exports.createUser = (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const profileName = req.body.profileName;
    const telephone = req.body.telephone;
    const imgSrc = req.body.imgSrc;
    const imgAlt = req.body.imgAlt;
    User.create({
        userName: userName,
        email: email,
        password: password,
        profileName: profileName,
        telephone: telephone,
        imgSrc: imgSrc,
        imgAlt: imgAlt
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

exports.updateUser = (req, res) => {

}

exports.patchUser = (req, res) => {
    
}

exports.deleteUser = (req, res) => {

}
