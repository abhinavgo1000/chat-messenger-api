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
    const id = req.params.id;
    User.findAll({
        where: {
            id: id
        }
    })
    .then((user) => {
        res.send(user[0]);
    })
    .catch((err) => {
        console.log(err);
    });
}

exports.updateUser = (req, res) => {
    const id = req.params.id;
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const profileName = req.body.profileName;
    const telephone = req.body.telephone;
    const imgSrc = req.body.imgSrc;
    const imgAlt = req.body.imgAlt;
    User.findById(id)
    .then((result) => {
        result.userName = userName;
        result.email = email;
        result.password = password;
        result.profileName = profileName;
        result.telephone = telephone;
        result.imgSrc = imgSrc;
        result.imgAlt = imgAlt;
        return result.save();
    })
    .then((res) => {
        console.log('user updated');
    })
    .catch((err) => {
        console.log(err);
    });
}

exports.patchUser = (req, res) => {
    
}

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    User.findById(id)
    .then((user) => {
        user.destroy();
    })
    .catch((err) => {
        console.log(err);
    });
}
