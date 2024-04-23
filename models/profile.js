const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    dob: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    imgSrc: String,
    imgAlt: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Profile', profileSchema);
