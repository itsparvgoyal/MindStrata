const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");
const {deleteProfile} = require("../controllers/Profile");
const {getUserDetails , updateProfile} = require("../controllers/User");

// Update Profile
router.put("/updateProfile", auth, updateProfile);

// Delete Account
router.delete("/deleteProfile", auth, deleteProfile);

// Get User Details
router.get("/getUserDetails", auth, getUserDetails);


module.exports = router;