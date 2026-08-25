const { BrevoClient } = require("@getbrevo/brevo");
const dotenv = require("dotenv");
dotenv.config();

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

const mailSender = async (email, title, body) => {
    try {
        const data = await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: process.env.MAIL_NAME,
                email: process.env.MAIL_USER,
            },
            to: [
                {
                    email: email,
                },
            ],
            subject: title,
            htmlContent: body,
        });

        console.log("Email sent:", data.messageId);

        return data;
    } catch (error) {
        console.error("Brevo error:", error);
        throw error;
    }
};

module.exports = mailSender;