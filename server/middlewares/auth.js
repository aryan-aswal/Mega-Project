const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const auth = async(req, res, next) => {
    try {
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            })
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while validating the token",
        })
    }
}

const isStudent = async(req, res, next) => {
    try {
        if(req.user.accountType != "Student") {
            return res.status(400).json({
                success: false,
                message: "This is a protected route for students only"
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again",
        })
    }
}


const isInstructor = async(req, res, next) => {
    try {
        if(req.user.accountType != "Instructor") {
            return res.status(400).json({
                success: false,
                message: "This is a protected route for Instructor only"
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again",
        })
    }
}

const isAdmin = async(req, res, next) => {
    try {
        if(req.user.accountType !== "Admin") {
            return res.status(400).json({
                success: false,
                message: "This is a protected route for isAdmin only"
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again",
        })
    }
}
module.exports = { isStudent, auth, isInstructor, isAdmin };