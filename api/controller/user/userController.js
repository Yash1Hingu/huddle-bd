const mongoose = require('mongoose');
const User = mongoose.model('user');

exports.create_a_user = async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

exports.read_a_user = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}