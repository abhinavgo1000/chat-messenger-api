const Message = require('../models/message');

exports.getMessages = (req, res) => {
    Message.fetchAll()
        .then(([rows]) => {
            res.send({
                message: rows[1].message
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.postMessages = (req, res) => {
    Message.save()
        .then(() => {
            res.send({ message: 'data sent!' })
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getIndex = (req, res) => {
    Message.fetchAll()
        .then(([rows]) => {
            console.log(rows);
        })
        .catch((err) => {
            console.log(err);
        });
}
