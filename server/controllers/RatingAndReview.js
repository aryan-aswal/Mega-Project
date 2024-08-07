const User = require('../models/User');
const Course = require('../models/Course');
const ratingAndReview = require('../models/RatingAndReview');
const mongoose = require('mongoose');

const createRating = async(req, res) => {
    try {
        const { courseId, rating, review } = req.body;
        const userId = req.user.id;

        const courseDetails = await  Course.findOne({_id: courseId, studentsEnrolled: {$elemMatch: {$eq: userId}}});

        if(!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course",
            })
        }

        const userDetails =  await ratingAndReview.findOne({user: userId, course: courseId});
        if(userDetails) {
            return res.status(403).json({
                success: false,
                message: "Course is already reviewed by the user",
            })
        }

        const ratingReview = await ratingAndReview.create({user: userId, course: courseId, rating, review});

        await Course.findOneAndUpdate({_id: courseId}, {$push: {ratingAndReviews: ratingReview._id}}, {new: true});
        
        res.status(200).json({
            success: true,
            message: "Rating and Review Created Successfully",
            ratingReview,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getAverageRating = async(req, res) => {
    try {
        // get course ID
        const { courseId } = req.body;

        // calculate average rating
        const result = await ratingAndReview.aggregate([

            {$match:{course: new mongoose.Schema.Types.ObjectId(courseId)}},

            {$group: {
                _id: null, 
                averageRating: {$avg: "$rating"},
            }}
            
        ])

        if(result.length > 0) {
            res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        res.status(200).json({
            success: true,
            averageRating: 0,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getAllRating = async(req, res) => {
    try {
        const allReviews = await ratingAndReview.find({}).sort({rating: "desc"})
        .populate(
            {
                path: 'user',
                select: "firstName lastName email image",
            }
        )
        .populate(
            {
                path: 'course',
                select: "courseName"
            }
        )
        .exec();

        res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = { createRating, getAverageRating, getAllRating };