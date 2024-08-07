const OTP = require('../models/OTP');
const User = require('../models/User');
const Profile = require('../models/Profile')
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { mailSender } = require('../utils/mailSender');
const { passwordUpdated } = require('../mail/templates/passwordUpdate');
require('dotenv').config();


const sendotp = async(req, res ) => {
    try {
        // fetch email from request
        const { email } = req.body;

        // validation --> check whether user is registered or not
        const isUserPresent = await User.findOne({email: email});
        
        if(isUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered"
            })
        }

        // how to generate otp //
        
        do {
            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })

            var result = await OTP.findOne({otp: otp});
            
        } while (result);


        // creating entry of otp in database
        const otpPayload = {email, otp};
        const otpBody = await OTP.create(otpPayload);

        console.log("hello");
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp: otp,
        })
        console.log("hello");
    } catch (error) {
        console.log("error hello");
        console.log("Error while sending OTP", error.message);
        res.status(501).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const signup = async(req, res) => {
    try {

        const { firstName, lastName, email, password, confirmPassword, accountType, otp, contactNumber } = req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(400).json({
                success: false,
                message: "Please Fill All The Details"
            })
        }

        if(password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password are different",
            })
        }

        const existingUser = await User.findOne({email: email});

        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            })
        }
       
        const recentOtp = await OTP.find({email: email}).sort({createdAt: -1}).limit(1); // HOW 
        console.log("This is the otp  -> " , recentOtp);

        if(recentOtp.length == 0) {
            return res.status(404).json({
                success: false,
                message: "OTP Not Found"
            })
        }
        
        if(otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

      
        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })
      
        const user = await User.create({
            firstName, 
            lastName, 
            email, 
            password: hashedPassword, 
            accountType, 
            contactNumber, 
            additionalDetails: profileDetails._id, 
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user: user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "User cannot be registered, Please try again later!"
        })
    }
    
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required, please try again",
            })
        }

        const user = await User.findOne({email: email}).populate("additionalDetails");

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please sign up first",
            })
        }

        // create jwt token

        if(await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,

            }
            
            const JWT_SECRET = process.env.JWT_SECRET;
            const token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: "2h",
            })
            user.token = token;
            user.password = undefined;

            const options  = {
                expire: Date.now() + 3 * 24 * 60 * 60 * 1000,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token: token, 
                user: user,
                message: "Logged in successfully",
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Password is incorrect",
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Login failure, please try again",
        })
    }
}

// Controller for Changing Password
const changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if(oldPassword === newPassword){
			return res.status(400).json({
				success: false,
				message: "New Password cannot be same as Old Password",
			});
		}
		
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				"Study Notion - Password Updated",
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);

			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res.status(200).json({ 
            success: true, 
            message: "Password updated successfully" 
        });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};

module.exports = { sendotp, signup, login, changePassword }