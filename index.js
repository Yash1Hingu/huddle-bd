require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');

// connect mongoose db.
mongoose.connect(process.env.MONGOOSE_URL).then(res => {
    console.log("mongoose connected.")
}).catch(err => {
    console.log(err);
})

app.listen(PORT, () => {
    console.log("Server running on " + PORT);
})