const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;

const notificationSchema = new mongoose.Schema({
    user: {
        type: ObjectID,
        ref: 'user',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    link: {  // Optional: If you want to link it to an action or resource (e.g., a channel join request)
        type: String,
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
