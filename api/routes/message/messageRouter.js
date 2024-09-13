const express = require('express');
const router = new express.Router();

const messageactions = require('../../controller/message/messageController');
const UserAuth = require('../../middleware/userAuth');

// create a message.
router.post('/channels/:channelId/messages', UserAuth, messageactions.create_a_message);
router.get('/channels/:channelId/messages', UserAuth, messageactions.read_a_messages);

module.exports = router;