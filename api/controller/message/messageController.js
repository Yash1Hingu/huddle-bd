const mongoose = require('mongoose');
const Message = mongoose.model('message');

exports.create_a_message = async (req, res) => {

    const channelId = req.params.channelId;
    const sender = req.user._id;
    const message = req.body.message;


    try {
        const new_message = await Message.create({ channelId, sender, message });
        await new_message.save();
        res.status(201).send({ new_message });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

}

exports.read_a_messages = async (req, res) => {

    const channelId = req.params.channelId;
    const messages = await Message.find({ channelId }).sort({ createdAt: -1 });

    const usersChannel = req.user.channels;
    
    res.status(200).send(messages);
}