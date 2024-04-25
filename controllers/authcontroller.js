const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res) => {
    res.render('', {
        isLoggedIn: false
    });
};

exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then((user) => {
        if (!user) {
            res.redirect('');
        }
        bcrypt.compare(password, user.password)
        .then((doMatch) => {
            if (doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                req.session.save((err) => {
                    console.log(err);
                    res.redirect('');
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.redirect('');
        });
    })
    .catch((err) => {
        console.log(err);
        res.redirect('');
    });
};

exports.postSignup = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email: email})
    .then((userDoc) => {
        if (userDoc) {
            return res.redirect('');
        }       
    })
    return bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
        const user = new User({
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
    .catch((err) => {
        console.log(err);
    });
};

exports.postLogout = (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
    });
};
