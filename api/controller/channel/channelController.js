const mongoose = require('mongoose');
const User = mongoose.model('user');
const Channel = mongoose.model('channels');

exports.create_a_channel = async (req, res) => {
    let new_channel = new Channel(req.body);
    const user = req.user;

    // add userid in channel.
    const userID = user._id;
    new_channel.users = new_channel.users.concat(userID);

    const userData = await User.findById(userID);

    try {
        await new_channel.save();
        const channelId = new_channel._id;

        // add channel id in user.
        userData.channels = userData.channels.concat(channelId);
        await userData.save();

        res.status(201).send({ new_channel, userData });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

exports.read_a_channels = async (req, res) => {

    // channels retrive.
    const channelsIds = req.user.channels;
    const token = req.token;
    console.log(channelsIds);
    // response.
    const channels = await Channel.find({_id: {$in: channelsIds}});
    console.log(channels);

    res.status(200).send({ channels, token});
}