const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async(email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port:465,
            secure:false,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });


        let info = await transporter.sendMail({
            from:`Mind Strata`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        });
        
        // console.log("Info: ", info);
        return info;
    } catch (error) {
        console.log("Error in mailSender: ", error);
    }
}

module.exports = mailSender;