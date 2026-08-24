const express = require("express");
const router = express.Router();
const {login , signUp , sendOTP , changePassword, refreshAccessToken , logout} = require("../controllers/User");
const {resetPasswordOTP , resetPassword , verifyResetOTP} = require("../controllers/ResetPassword");
const {auth} = require("../middlewares/auth");

// AUTH ROUTES
router.post("/login", login);
router.post("/signup",signUp);
router.post("/sendotp", sendOTP);
router.post("/changepassword", auth, changePassword);
router.post("/resetpasswordotp", resetPasswordOTP);
router.post("/resetpassword", resetPassword);
router.post("/verifyresetotp", verifyResetOTP);

router.post("/refresh", refreshAccessToken);
router.post("/logout", auth, logout);


module.exports = router;