const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Database connected");
        })
        .catch((err) => {
            console.error("FULL MONGODB ERROR:");
            console.error(err.message);
        });
};

module.exports = connectDB;
