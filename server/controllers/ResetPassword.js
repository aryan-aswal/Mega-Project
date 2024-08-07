// login form ke neeche forgot password ke baad ke controllers

const User = require("../models/User");
const { mailSender } = require('../utils/mailSender');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const resetPasswordToken = async(req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({email});

        if(!user) {
            res.status(404).json({
                success: false,
                message: "Your email is not registered with us",
            })
        }

        const token = crypto.randomUUID();

        await User.findOneAndUpdate({email: email}, {token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000}, {new: true});
         
        const url =  `https://studynotion-frontend-virid.vercel.app/update-password/${token}`;

        await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

        res.status(200).json({
            success: true,
            message: "Email sent successfully, please check and change password" 
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong please, try again later"
        })
    }
}

const resetPassword = async(req, res) => {
    try {
        const {password, confirmPassword, token} = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password not matching"
            })
        }

        const userDetails = await User.findOne({token: token});

        if(userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: "Token is expired, please regenerate your token",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate({token: token}, {password: hashedPassword}, {new: true});
        
        res.status(200).json({
            success: true,
            message: "Password reset successfully",
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending reset password mail"
        })
    }
}

module.exports = {resetPassword, resetPasswordToken}
