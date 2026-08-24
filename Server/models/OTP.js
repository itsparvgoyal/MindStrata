const mongoose = require("mongoose");
const mailSender = require("../utilis/mailSender");
const otpTemplate = require("../templates/signUpOTP");
const resetPasswordTemplate = require("../templates/resetPassword");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    otp: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 90,
    }
});


// a fucn to send otp on emails 
const sendOTP = async(email, otp) => {
    try {
        const title = "MindStrata OTP Verification";
        await mailSender(email, title, otpTemplate(otp));
    } catch (error) {
        console.log("Error in mailSender: ", error);
    }
}

const sendOTPReset = async(email, otp) => {
    try {
        const title = "MindStrata Reset Password";
        await mailSender(email, title, resetPasswordTemplate(otp));
    } catch (error) {
        console.log("Error in mailSender: ", error);
    }
}

// ye pre hook hai 
OTPSchema.pre("save", async function() {
    if(this.isNew){
        if(this.$locals.fromController === "resetPassword"){
            await sendOTPReset(this.email, this.otp);
        }
        else{
            await sendOTP(this.email, this.otp);
        }
    }
});



const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;