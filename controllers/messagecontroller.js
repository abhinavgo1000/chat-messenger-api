const Message = require('../models/message');

exports.receiveMessages = (req, res) => {
    Message.findAll()
    .then((messages) => {
        res.send(messages);
    })
    .catch((err) => {
        console.log(err);
    });
}

exports.sendMessages = (req, res) => {
    const message = req.body.message;
    Message.create({
        message: message
    })
    .then(() =>{
        console.log('message sent');
    })
    .catch((err) => {
        console.log(err);
    });
}
