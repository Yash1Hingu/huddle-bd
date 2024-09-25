require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

const mongoose = require('mongoose');
User = require('./api/models/user/userModel');
Channel = require('./api/models/channels/channelModel');
Message = require('./api/models/message/messageSchema');
Notification = require('./api/models/notification/notificationSchema');

// connect mongoose db.
mongoose.connect(process.env.MONGOOSE_URL).then(res => {
    console.log("mongoose connected.")
}).catch(err => {
    console.log(err);
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());


// importing router.
const userRouter = require('./api/routes/user/userRoutes');
const channelRouter = require('./api/routes/channel/channelRoutes'); 
const messageRouter = require('./api/routes/message/messageRouter');
const notificationRouter = require('./api/routes/notification/notificationRouter');

app.use('/api', userRouter);
app.use('/api', channelRouter);
app.use('/api', messageRouter);
app.use('/api', notificationRouter);

app.listen(PORT, () => {
    console.log("Server running on " + PORT);
})