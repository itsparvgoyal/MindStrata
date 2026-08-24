const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const { uploadFileToCloudinary } = require("../utilis/cloudinaryUploader");
const mailSender = require("../utilis/mailSender");

const signupTemplate = require("../templates/signUp");
const changePasswordTemplate = require("../templates/changePassword");
require("dotenv").config();

// send otp controller 
const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        // check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                success: false,
                message: "User already exists",
            });
        }

        // generate otp 
        var otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });

        // check otp is unique or not 
        var existingOtp = await OTP.findOne({ otp });
        while (existingOtp) {
            otp = otpGenerator.generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            });
            existingOtp = await OTP.findOne({ otp });
        }


        // create otp in database 
        //! otp.create ke chalne se mail send ho chuka hoga ho as apa ne pre hook bnaya tha 
        const otpData = await OTP.create({ email, otp });

        // send response    
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            data: otpData,
        });

    } catch (error) {
        console.log("Error in sendOTP: ", error);
        res.status(500).json({
            success: false,
            message: "Error in sending OTP",
        });
    }
}

const generateAccessToken = (user) =>{
    // console.log("refresh Access route hitted");
    const payload = {
        email: user.email,
        id: user._id,
        role: user.accountType,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "20m",
    });
    return token; 
}

const generateRefreshToken = (user) =>{
    const payload = {
        email: user.email,
        id: user._id,
        role: user.accountType,
    }

    const token = jwt.sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: "15d",
    });
    return token; 
}


// sign up controller 
const signUp = async (req, res) => {
    try {
        const { firstName, lastName, accountType, email, password, confirmPassword, otp, contactNumber } = req.body;

        // validate krlo 
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp || !contactNumber) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check if user already exists
        const alreadyUser = await User.findOne({ email });
        if (alreadyUser) {
            return res.status(401).json({
                success: false,
                message: "User already exists",
            });
        }

        // check password and confirm password are same
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password and confirm password are not same",
            });
        }

        // recent otp nikal lia
        const recentOTP = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        if (!recentOTP) {
            return res.status(401).json({
                success: false,
                message: "OTP not found or expired",
            });
        }

        // check krlo otp 
        if (recentOTP.otp !== otp) {
            return res.status(401).json({
                success: false,
                message: "Invalid OTP",
            });
        }


        // hash password
        const hashedPassword = await bcrypt.hash(String(password), 10);

        // add dummy profile (empty profile)
        const profile = await Profile.create({
            gender: null,
            dateOfBirth: null,
            contactNumber: null,
            about: null,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        
        // create user
        const response = await User.create({
            email, password: hashedPassword, firstName, lastName, accountType: accountType || "Student",
            additionalDetails: profile._id,
        });
        
        const accessToken = generateAccessToken(response);
        const refreshToken = generateRefreshToken(response);

        // save refreshToken in database
        response.refreshToken = refreshToken;
        await response.save();

        // remove password from response object
        response.password = undefined;
        const user = await User.findById(response._id).populate("additionalDetails").exec();

        //  cookie set krlo 
        const options = {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 24 * 60 * 60 * 1000,
            sameSite:"strict",
        };

        res.cookie("refreshToken", refreshToken, options).status(200).json({
            success: true,
            message: "User created  successfully",
            token: accessToken,
            user: user,
        });

        // mail send kro 
        await mailSender(
            email,
            "Welcome to MindStrata",
            signupTemplate(firstName)
        );

    } catch (error) {
        console.log("Error in signUp: ", error);
        res.status(500).json({
            success: false,
            message: "Error in sign up",
        });
    }
}

// login controller 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate krlo 
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check if user does not  exists
        const user = await User.findOne({ email }).populate("additionalDetails").exec();
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        // check password
        const isPasswordValid = await bcrypt.compare(String(password), user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        // create token 
       const accessToken = generateAccessToken(user);
       const refreshToken = generateRefreshToken(user);

       user.refreshToken = refreshToken;
       await user.save();

        // remove password from user object
        user.password = undefined;

        //  cookie set krlo 
        const options = {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
        };
        
        res.cookie("refreshToken", refreshToken, options).status(200).json({
            success: true,
            message: "User logged in successfully",
            token: accessToken,
            user: user,
        });

    } catch (error) {
        console.log("Error in login: ", error);
        res.status(500).json({
            success: false,
            message: "Error in login",
        });
    }
}

// change password controller 
const changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword, confirmPassword } = req.body;
        // console.log(req.body)

        // validate krlo 
        if (!email || !oldPassword || !newPassword || !confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check if user does not  exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        // check old password 
        const isOldPasswordValid = await bcrypt.compare(String(oldPassword), user.password);
        if (!isOldPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid old password",
            });
        }

        // check password and confirm password are same
        if (newPassword !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password and confirm password are not same",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(String(newPassword), 10);

        // update password
        user.password = hashedPassword;
        await user.save();

        // send response    
        res.status(200).json({
            success: true,
            message: "Password changed successfully",
            user: user,
        });

        // send mail 
        await mailSender(email, "Password Changed", changePasswordTemplate(user.firstName));

    } catch (error) {
        console.log("Error in changePassword: ", error);
        res.status(500).json({
            success: false,
            message: "Error in changing password",
        });
    }

}


// get all user details 
const getUserDetails = async (req, res) => {
    try {
        // find user by id 
        const id = req.user.id || req.body._id;
        const user = await User.findById(id).populate({
            path: "courses",
            populate: {
                path: "category",
                model: "Category",
            }
        }).populate("additionalDetails").populate("courseProgress").exec();
        // send response 
        res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            user: user,
        });
    } catch (error) {
        console.log("Error in getUserDetails: ", error);
        res.status(500).json({
            success: false,
            message: "Error in getting user details",
        });
    }
}

// edit profile 
const updateProfile = async (req, res) => {
    try {
        const reqData = req.body;
        const userId = req.user.id;

        const userProfile = await User.findById(userId).populate("additionalDetails").populate("courseProgress").exec();

        userProfile.firstName = reqData?.firstName || userProfile.firstName;
        userProfile.lastName = reqData?.lastName || userProfile.lastName;
        userProfile.additionalDetails.gender = reqData?.gender || userProfile.additionalDetails.gender;
        userProfile.additionalDetails.dateOfBirth = reqData?.dateOfBirth || userProfile.additionalDetails.dateOfBirth;
        userProfile.additionalDetails.contactNumber = reqData?.contactNumber || userProfile.additionalDetails.contactNumber;
        userProfile.additionalDetails.about = reqData?.about || userProfile.additionalDetails.about;

       
        if (req?.files?.profileImage) {
            const image = await uploadFileToCloudinary(req.files.profileImage, "Profile");
            // console.log("image " , image)
            userProfile.additionalDetails.image = image.secure_url;
        }


        await userProfile.save();
        await userProfile.additionalDetails.save();

        userProfile.password = undefined;
        
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: userProfile,
        });
        
    } catch (error) {
        console.log("Error in editProfile: ", error);
        return res.status(500).json({
            success: false,
            message: "Error in editing profile",
        });
    }
}

const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ success: false, message: "Refresh token is missing" });
        }

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        } catch (err) {
            return res.status(401).json({ success: false, message: "Invalid or expired refresh token" });
        }

        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ success: false, message: "Session expired or logged in elsewhere" });
        }

        // Generate a new access token
        const newAccessToken = generateAccessToken(user);

        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
            token: newAccessToken,
        });        
    } catch (error) {
        console.log("Error in refreshing access token:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error" 
        });
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie("refreshToken");
        // console.log(req?.user)

        // remove refreshToken from db 
        const user = await User.findById(req?.user?.id);
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        user.refreshToken = null;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        console.log("Error in logout: ", error);
        res.status(500).json({
            success: false,
            message: "Error in logout",
        });
    }
}

// export all controllers
module.exports = {
    login,
    signUp,
    sendOTP,
    changePassword,
    getUserDetails,
    updateProfile,
    logout,
    refreshAccessToken
}
