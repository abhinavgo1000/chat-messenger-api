const Message = require('../models/message');

exports.receiveMessages = (req, res) => {
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

exports.sendMessages = (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    res.status(201).json({
        message: 'Post created successfully',
        post: { id: new Date().toISOString(), title: title, content: content }
    });
};
