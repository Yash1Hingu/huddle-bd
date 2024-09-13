const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;

const messageSchema = new mongoose.Schema({
    channelId: {
        type: ObjectID,
        required: true,
        ref: 'channels',
    },
    sender: {
        type: ObjectID,
        required: true,
        ref: 'user',
    },
    message: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Message = mongoose.model('message', messageSchema);
module.exports = Message;