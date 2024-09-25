const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;

const channelSchema = new mongoose.Schema({
    channelName: {
        type: String,
        required: true,
    },
    users: [{
        type: ObjectID,
        required: true,
        ref: 'user'
    }],
    joinRequests: [{
        user: {
            type: ObjectID,
            ref: 'user',
            required: true
        },
        status: {
            type: String, // pending, accepted, rejected
            default: 'pending',
            required: true,
        }
    }]
}, { timestamps: true });

const Channel = mongoose.model('channels', channelSchema);
module.exports = Channel;