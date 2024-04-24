const Message = require('../models/message');

exports.receiveMessages = (req, res) => {
    Message.find()
    .then((messages) => {
        res.send(messages);
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.sendMessages = (req, res) => {
    const message = req.body.message;
    const msg = new Message({
        message: message,
        userId: req.user._id
    });
    msg.save()
    .then(() => {
        console.log('message sent');
    })
    .catch((err) => {
        console.log(err);
    });
};
