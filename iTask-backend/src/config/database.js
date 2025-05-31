const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Remove the deprecated options
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected.");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
