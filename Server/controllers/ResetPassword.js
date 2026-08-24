const User = require("../models/User");
require("dotenv").config();
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");

// send reset password otp 
const resetPasswordOTP = async (req, res) => {
    try {
        
        // get email 
        const { email } = req.body;

        // validate email 
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }
        // check user exist or not 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // generate otp
        var otp = otpGenerator.generate(4, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });

        // create otp in database 
        const otpData = new OTP({
            email,
            otp,
        });

        otpData.$locals.fromController = "resetPassword"; // basically ek local data me store kr rhe hai kis controller se req gyi hai , taki mail send konsi krni hai preHook me wo pta chale
        await otpData.save();

        return res.status(200).json({
            success: true,
            message: "Reset password OTP sent successfully",
            data: otpData,
        });

    } catch (error) {
        console.log("Error in resetPasswordOTP : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// verify otp 
const verifyResetOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        // check otp with latest otps in db 
        const latestOTP = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        if (!latestOTP) {
            return res.status(404).json({
                success: false,
                message: "OTP not found or expired"
            });
        }

        // check otp
        if (latestOTP.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // reset token store kro 
        const resetToken = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: "10m" }
        );

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            resetToken,
        });
    } catch (error) {
        console.log("Error in verifyOTP : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

//  reset password 
const resetPassword = async (req, res) => {
    try {
        const {password , confirmPassword } = req.body;
        
        const resetToken = req.headers.authorization.split(" ")[1];
        
        if(!resetToken){
            return res.status(400).json({
                success: false,
                message: "Reset token is required"
            });
        }
        
        if (!password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        
        // console.log("testing")
        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
        // console.log(" decoded email " , decoded)
        const user = await User.findOne({email: decoded.email});

        // check password and confirm password 
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password do not match"
            });
        }
        
        // hash krdo password 
        const hashedPassword = await bcrypt.hash(String(password), 10);
        user.password = hashedPassword;
        await user.save();
        
        // send response 
        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {
        console.log("Error in resetPassword:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports = {
    resetPasswordOTP,
    resetPassword,
    verifyResetOTP,
}