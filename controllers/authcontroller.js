const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');

const User = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        // api_key:
    }
}));

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
    .then(() => {
        return transporter.sendMail({
            to: email,
            from: 'no-reply@abhinavgoel.org',
            subject: 'Congrats! Yoyr account is created',
            html: '<h1>You successfully signed up!</h1>'
        });
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

exports.postReset = (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            res.redirect('');
        }
        const token = buffer.toString('hex');
        User.findOne({email: req.body.email})
        .then((user) => {
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            return user.save();
        })
        .then(() => {
            transporter.sendMail({
                to: req.body.email,
                from: 'no-reply@abhinavgoel.org',
                subject: 'Password reset',
                html: `
                    <p>You recently requested password reset</p>
                    <p>Click on this <a href="http://localhost:4200/reset-password/${token}">link</a> to reset your password</p>`
            });
        })
        .catch((err) => {
            console.log(err);
        });
    });
};

exports.postNewPassword = (req, res) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;
    User.findOne({
        resetToken: passwordToken, 
        resetTokenExpiration: {$gt: Date.now()}, 
        _id: userId
    })
    .then((user) => {
        resetUser = user;
        return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = null;
        resetUser.resetTokenExpiration = null;
        return resetUser.save();
    })
    .catch((err) => {
        console.log(err);
    });
};
