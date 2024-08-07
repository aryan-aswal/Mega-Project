const Section = require('../models/Section');
const Course = require('../models/Course');

const createSection = async(req, res) => {
    try {
        const { sectionName, courseId } = req.body;
       
        if( !sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties",
            })
        }

        const newSection = await Section.create({sectionName});

        const updatedCourseDetails = await Course.findByIdAndUpdate({_id: courseId}, {$push: {courseContent: newSection._id}}, {new: true}).populate('courseContent');
        res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to create Section, please try again",
            error: error.message,
        })
    }
}

const updateSection = async(req, res) => {
    try {
        const { sectionName, sectionId, courseId } = req.body;
        console.log(sectionName, sectionId, courseId);

        if( !sectionName || !sectionId ) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties",
            })
        }

        const section = await Section.findByIdAndUpdate(sectionId, {sectionName: sectionName}, {new: true});
        const courseDetails = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();
        res.status(200).json({
            success: true,
            message: "Section updated succesfully",
            courseDetails,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to update Section, please try again later",
        })
    }
}

const deleteSection = async(req, res) => {
    try {
        const { sectionId, courseId } = req.body;

        const sectionInfo = await Section.findOneAndDelete({_id: sectionId});

        const courseDetails = await Course.findOneAndUpdate({_id: courseId}, {$pull: {courseContent: sectionInfo._id}}, {new: true}).populate('courseContent').populate('instructor').populate('category').exec();
        res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            courseDetails,
        })
    } catch (error) {
        
    }
}

module.exports = { updateSection, createSection, deleteSection };