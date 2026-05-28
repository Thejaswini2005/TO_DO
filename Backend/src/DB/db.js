const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect(process.env.mongo_url);

    console.log('Connected to MongoDB');
};

module.exports = connectDB;