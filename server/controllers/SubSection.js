const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

const { uploadImageToCloudinary } = require("../utils/imageUploader");

const createSubSection = async (req, res) => {
  try {
    const { sectionId, title, timeDuration, description, courseId } = req.body;

    const video = req.files.video;
    console.log(sectionId , title, description, video, courseId );
    if (!sectionId || !title || !description || !video || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    const subSectionDetails = await SubSection.create({
      title,
      timeDuration,
      description,
      videoUrl: uploadDetails.secure_url,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: subSectionDetails._id } },
      { new: true }
    ).populate("subSection");

    const updatedCourse = await Course.findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();

    res.status(200).json({
      success: true,
      message: "Sub-Section created successfully",
      updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// homework
const deleteSubSection = async (req, res) => {
    
	try {
		const {subSectionId,courseId} = req.body;
		const sectionId=req.body.sectionId;
	if(!subSectionId || !sectionId){
		return res.status(404).json({
            success: false,
            message: "all fields are required",
        });
	}
	const ifsubSection = await SubSection.findById({_id:subSectionId});
	const ifsection= await Section.findById({_id:sectionId});
	if(!ifsubSection){
		return res.status(404).json({
            success: false,
            message: "Sub-section not found",
        });
	}
	if(!ifsection){
		return res.status(404).json({
            success: false,
            message: "Section not found",
        });
    }
	await SubSection.findByIdAndDelete(subSectionId);
	await Section.findByIdAndUpdate(sectionId,{$pull:{subSection:subSectionId}},{new:true});
	const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();
	return res.status(200).json({ success: true, message: "Sub-section deleted", data: updatedCourse });
		
	} catch (error) {
		// Handle any errors that may occur during the process
        console.error("Error deleting sub-section:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
		
	}
};

const updateSubSection = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { subSectionId, title, description, courseId } = req.body;
    const video = req?.files?.video;

    let uploadDetails = null;
    // Upload the video file to Cloudinary
    if (video) {
      uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_VIDEO
      );
    }
    

    // Create a new sub-section with the necessary information
    const subsection = await SubSection.findById(subSectionId);
    const object = {
      title: title || subsection.title,
      description: description || subsection.description,
      videoUrl: uploadDetails?.secure_url || subsection.videoUrl,
    }
    const SubSectionDetails = await SubSection.findByIdAndUpdate(
      subSectionId ,
      object,
      { new: true }
    );
   
    const updatedCourse = await Course.findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();
     
    // Return the updated section in the response
    console.log(updatedCourse);
    return res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error creating new sub-section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { createSubSection, updateSubSection, deleteSubSection };
