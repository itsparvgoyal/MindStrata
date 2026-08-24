const Profile = require('../models/Profile');
const User = require('../models/User');



// delete profile 
const deleteProfile = async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await User.findById(userID);
        const profileID = user.additionalDetails._id;

        // delete profile 1st 
        const profile = await Profile.findByIdAndDelete(profileID);


        // update user model and set additionalDetails to null 
        await User.findByIdAndUpdate(userID, { additionalDetails: null });

        // send response 
        return res.status(200).json({
            success: true,
            message: "Profile deleted successfully",
        });

    } catch (error) {
        console.log('error in deleting profile', error);
        res.status(500).json({
            success: false,
            message: "Profile delete failed",
        })
    }
}

module.exports = {
    deleteProfile,
};