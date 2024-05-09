const { validationResult } = require('express-validator');

const Message = require('../models/message');

exports.receiveMessages = (req, res, next) => {
    Message.find()
    .then((messages) => {
        res.status(200).send(messages);
    })
    .catch((err) => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};

exports.showMessage = (req, res, next) => {
    const messageId = req.params.messageId;
    Message.findById(messageId)
    .then((msg) => {
        if (!msg) {
            const error = new Error('Could not find message');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: msg})
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.sendMessages = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, incorrect data');
        error.statusCode = 422;
        throw error;
    }
    const message = req.body.message;
    const imageUrl = req.file.path;
    const msg = new Message({
        message: message,
        imgUrl: imageUrl,
        creator: { name: 'Abhinav' }
    });
    msg.save()
    .then((result) => {
        console.log(result);
        res.status(201).json({
            message: 'Post created successfully',
            msg: result
        });
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
