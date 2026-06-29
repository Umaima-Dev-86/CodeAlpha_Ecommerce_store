const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Dotenvx ki aukaat se bahar direct connection
        await mongoose.connect('mongodb://127.0.0.1:27017/codealpha_ecommerce');
        console.log('🟢 MongoDB Connected Successfully (Local DB)!');
    } catch (error) {
        console.error('🔴 DB Connection Error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;