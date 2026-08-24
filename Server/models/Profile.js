const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

    gender: {
        type: String,
        trim:true
    },
    dateOfBirth: {
        type: Date,
    },
    about: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: Number,
        trim: true,
    },
    image: {
        type: String,
    },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
