const mongoose = require('mongoose');
const User = mongoose.model('user');
const Channel = mongoose.model('channels');
const Notification = require('../../models/notification/notificationSchema');

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
    const channels = await Channel.find({ _id: { $in: channelsIds } });
    console.log(channels);

    res.status(200).send({ channels, token });
}

// Send a join request
exports.send_join_request = async (req, res) => {
    try {
        const { channelId } = req.params;
        const { recipientUserId } = req.body;
        const senderUserId = req.user._id; // Assuming req.user contains the authenticated user

        const channel = await Channel.findById(channelId);
        if (!channel) return res.status(404).send('Channel not found');

        // Check if the user is already part of the channel
        if (channel.users.includes(recipientUserId)) {
            return res.status(400).send('User is already a member of the channel');
        }
        console.log(channel);

        // Add the join request to the channel
        channel.joinRequests.push({ user: recipientUserId, status: 'pending' });
        await channel.save();


        const recipientUser = await User.findById(recipientUserId);
        if (!recipientUser) return res.status(404).send('User not found');

        const notification = new Notification({
            user: recipientUserId,
            message: `You have a join request from ${req.user.username} to join channel ${channel.channelName}`,
            link: `/channels/${channelId}/join`  // You can use this link to direct the user to take action on the join request
        });

        await notification.save();

        return res.status(200).send('Join request sent successfully');
    } catch (error) {
        return res.status(500).send({ error });
    }
};


// Accecpt join request.
exports.accept_join_request = async (req, res) => {
    try {
        const { channelId } = req.params;
        const userId = req.user._id;

        const channel = await Channel.findById(channelId);
        if (!channel) return res.status(404).send({ error: 'Channel not found' });

        const joinRequest = channel.joinRequests.find(req => req.user.toString() === userId.toString() && req.status === 'pending');
        if (!joinRequest) return res.status(404).send({ error: 'No pending join request found' });

        joinRequest.status = 'accepted';
        channel.users.push(userId);
        await channel.save();

        const user = await User.findById(userId);
        if (!user.channels.includes(channelId)) {
            user.channels.push(channelId);
        }
        await user.save();

        const notification = await Notification.findOne({ user: userId });
        if (notification) {
            notification.read = true;
            notification.message = `You have joined the channel ${channel.channelName}`;
            await notification.save();
        }

        return res.status(200).send({ msg: 'You have joined the channel.' });
    } catch (error) {
        return res.status(500).send({ error: 'Server error' });
    }
};


exports.read_users = async (req, res) => {
    try {
        const { channelId } = req.params;
        const channel = await Channel.findById(channelId);
        const users = await User.find({ _id: { $nin: channel.users } }).populate('username', '_id');
        res.send(users);
    } catch (error) {
        res.status(404).send({ error: error });
    }
}