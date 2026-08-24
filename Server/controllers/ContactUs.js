const Contact = require('../models/ContactUs');
const mailSender = require("../utilis/mailSender");
const supportUserTemplate = require("../templates/supportUser");
const supportOwnerTemplate = require("../templates/supportOwner");


const createReq = async (req , res)=>{
    try {
        // console.log(req.body)
        // console.log("hello")
        const {name , email , mobileNumber , queryRegarding , message} = req.body;

        if( !name || !email || !mobileNumber || !queryRegarding || !message){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        const response = await Contact.create({name , email , mobileNumber , queryRegarding , message});

        // Send email to the user confirming receipt
        try {
            await mailSender(
                email,
                "We received your support request - MindStrata",
                supportUserTemplate(name, queryRegarding)
            );
        } catch (mailError) {
            console.log("Error sending support receipt email to user:", mailError);
        }

        // Send email to the owner with the ticket details
        try {
            await mailSender(
                "goyalparv.93@gmail.com",
                `New Support Ticket: ${queryRegarding} - ${name}`,
                supportOwnerTemplate(name, email, mobileNumber, queryRegarding, message)
            );
        } catch (mailError) {
            console.log("Error sending support ticket email to owner:", mailError);
        }

        return res.status(200).json({
            success:true,
            message:"Request created successfully",
            response
        })
    } catch (error) {
        console.log('error in creating request', error);
        return res.status(500).json({
            success:false,
            message:"Failed to create request",
        })
    }
}

module.exports = {createReq};