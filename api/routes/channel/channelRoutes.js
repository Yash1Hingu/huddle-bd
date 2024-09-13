const express = require('express');
const router = new express.Router();

const channelactions = require('../../controller/channel/channelController');
const UserAuth = require('../../middleware/userAuth');

router.post('/channel/create', UserAuth, channelactions.create_a_channel);
router.get('/channels', UserAuth, channelactions.read_a_channels);

module.exports = router;