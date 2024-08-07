const Course = require('../models/Course');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

const updateProfile = async(req, res) => {
    try {
        const { dateOfBirth = "", about = "", contactNumber="",firstName,lastName,gender="" } = req.body;
		const id = req.user.id;

		// Find the profile by id
		const user = await User.findById(id);
		const profile = await Profile.findById(user.additionalDetails);

		// Update the profile fields
		user.firstName = firstName || user.firstName;
		user.lastName = lastName || user.lastName;
		profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
		profile.about = about || profile.about;
		profile.gender=gender || profile.gender;
		profile.contactNumber = contactNumber || profile.contactNumber;

		// Save the updated profile
		await profile.save();
		await user.save();

        const userDetails = await User.findById(id).populate('additionalDetails');
        // return response
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            userDetails,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message,
        })
    }
}

const deleteAccount = async(req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id);

        if(!userDetails) {
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        await Profile.findByIdAndDelete(userDetails.additionalDetails);
        const courses = userDetails.courses;


        courses.forEach(async function (courseId) {
            await Course.findByIdAndUpdate(courseId, {$pull: {studentsEnrolled: id}});
        })
        
        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cannot delete successully",
        });
    }
}

const getAllUserDetails = async(req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id).populate('additionalDetails').exec();
        if(!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            userDetails,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getEnrolledCourses = async(req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const enrolledCourses = await User.findById(id).populate({
			path : "courses",
				populate : {
					path: "courseContent",
			}
		}
		).populate("courseProgress").exec();
        
       
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: enrolledCourses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const updateDisplayPicture = async(req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const { image } = req.files;
        console.log(image);
        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found",
            });
        }
        
        const uploadDetails = await uploadImageToCloudinary(
            image,
            process.env.FOLDER_NAME
        );

       
        console.log(uploadDetails);

        const updatedImage = await User.findByIdAndUpdate({_id:id},{image:uploadDetails.secure_url},{ new: true });

        res.status(200).json({
            success: true,
            message: "Image updated successfully",
            data: updatedImage,
        });
		
	} catch (error) {
        console.log(error);
		return res.status(500).json({
            success: false,
            message: error.message,
        });
		
	}

}

const instructorDashboard = async(req, res) => {
    try {
		const id = req.user.id;
		const courseData = await Course.find({instructor:id});
		const courseDetails = courseData.map((course) => {
			totalStudents = course?.studentsEnrolled?.length;
			totalRevenue = course?.price * totalStudents;
			const courseStats = {
				_id: course._id,
				courseName: course.courseName,
				courseDescription: course.courseDescription,
				totalStudents,
				totalRevenue,
			};
			return courseStats;
		});
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: courseDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}
module.exports = { updateProfile, deleteAccount, getAllUserDetails, getEnrolledCourses, updateDisplayPicture, instructorDashboard };



