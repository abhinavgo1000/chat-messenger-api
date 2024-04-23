const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    profileName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    message: {
        items: [
            {
                messageId: {
                    type: Schema.Types.ObjectId, 
                    ref: 'Message', 
                    required: true
                }
            }
        ]
    },
    profile: {
        items: [
            {
                profileId: {
                    type: Schema.Types.ObjectId, 
                    ref: 'Profile', 
                    required: true
                }
            }
        ]
    }
});

module.exports = mongoose.model('User', userSchema);
