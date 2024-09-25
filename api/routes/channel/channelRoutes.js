const express = require('express');
const router = new express.Router();

const channelactions = require('../../controller/channel/channelController');
const UserAuth = require('../../middleware/userAuth');

router.post('/channel/create', UserAuth, channelactions.create_a_channel);
router.get('/channels', UserAuth, channelactions.read_a_channels);
router.get('/channel/:channelId/users', UserAuth, channelactions.read_users);

// Send join request to another user
router.post('/channels/:channelId/join', UserAuth, channelactions.send_join_request);
// Accept join request
router.post('/channels/:channelId/join/accept', UserAuth, channelactions.accept_join_request);

module.exports = router;