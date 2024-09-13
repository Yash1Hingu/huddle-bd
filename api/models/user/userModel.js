require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ObjectID = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true
    },
    channels: [{
        type: ObjectID,
        ref: "channels"
    }],
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
}, {
    timestamps: true
});

// hash plain password.
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

// generate auth token.
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_TOKEN);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

// login the user
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('user not found.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Password is wrong');
    }

    return user;
}


const User = mongoose.model('user', userSchema);
module.exports = User;