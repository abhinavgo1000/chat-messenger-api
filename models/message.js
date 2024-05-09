const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    imgUrl: String,
    creator: {
        type: Object,
        required: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
