const nodemailer = require('nodemailer');
require('dotenv').config();
// Create Transporter

const mailSender = async(email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
        let info = await transporter.sendMail({
            from: `Study Notion`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })
        return info;
    } catch (error) {
        console.log(error.message);   
    }
}

module.exports = { mailSender };