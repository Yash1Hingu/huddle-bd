require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/user/userModel');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decode = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token });

        if (!user) {
            throw new Error('User not Authenticated.');
        }

        req.token = token;
        req.user = user;
        next();

    } catch (error) {
        res.status(401).send({ error: error });
    }
};

module.exports = auth;