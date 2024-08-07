const mongoose = require('mongoose');
const { mailSender } = require('../utils/mailSender');
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,
    },
    otp: {
        type: String, 
        required: true,
    },
    createdAt: {
        type: Date, 
        default: Date.now(),
        required: true,
        expires: 5 * 60,
    }
})

const verification = async(email, otp) => {
    try {
        const mailResponse = await mailSender(email, "Verification Email from Study Notion", emailTemplate(otp));
        console.log("Email Send Successfully!", mailResponse);
    } catch (error) {
        console.log("Error occurred while sending mail ", error.message);
    }
}

otpSchema.pre('save', async function (next) {
    await verification(this.email, this.otp);
    next()
})
module.exports = mongoose.model("OTP", otpSchema);