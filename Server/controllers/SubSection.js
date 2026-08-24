const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadFileToCloudinary } = require('../utilis/cloudinaryUploader');
const summaryQueue = require("../queue/summaryQueue");


const formatDuration = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
};

// create sub section handler
const createSubSection = async (req, res) => {
    try {
        // data fetch
        const { sectionId , title, description } = req.body;
        
        // video upload
        const video = req.files.video;
        const videoUpload = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);

        // data validate
        if(!sectionId  || !title || !description || !video){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // check section exists or not
        const sectionDetails = await Section.findById(sectionId);
        if(!sectionDetails){
            return res.status(404).json({
                success: false,
                message: "Section not found",
            })
        }


        // sub section create
        const subSection = await SubSection.create({
            title,
            description,
            videoUrl : videoUpload.secure_url,
            timeDuration : formatDuration(Math.round(videoUpload.duration)),
        })

        // add sub section to section
        const section = await Section.findById(sectionId);
        section.subsection.push(subSection._id);
        await section.save();

        // Enqueue summary generation job
        await summaryQueue.add("lecture-summary", {
            subSectionId: subSection._id,
        });

        const response = await  Section.findById(sectionId).populate("subsection").exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Sub section created successfully",
            response,
        })

    } catch (error) {
        console.log('error in creating sub section' , error);
        res.status(500).json({
            success: false,
            message: "Sub section creation failed",
        })
    }
}

// update sub section handler
const updateSubSection = async (req, res) => {
    try {
        // data fetch
        const { sectionId , subSectionId , title, description } = req.body;
        // console.log(req.body)
        // video upload
        const video = req.files ? req.files.video : null;
        let videoUpload;
        if(video){
            videoUpload = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);
        }

        // data validate
        if(!subSectionId || !title || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // check sub section exists or not
        const subSection = await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(404).json({
                success: false,
                message: "Sub section not found",
            })
        }

        const isVideoUpdated = !!videoUpload;
        const isDescriptionUpdated = description !== subSection.description;

        const updateData = {
            title,
            description,
            videoUrl: videoUpload ? videoUpload.secure_url : subSection.videoUrl,
            timeDuration: videoUpload ? formatDuration(Math.round(videoUpload.duration)) : subSection.timeDuration,
        };

        // Reset summary and questions if description or video is updated
        if (isVideoUpdated || isDescriptionUpdated) {
            updateData.summary = null;
            updateData.summaryStatus = "PENDING";
            updateData.summaryError = null;
            updateData.summaryGeneratedAt = null;

            updateData.extractedQuestions = null;
            updateData.questionsStatus = "PENDING";
            updateData.questionsError = null;
            updateData.questionsGeneratedAt = null;
        }

        // sub section update
        const newSubSection = await SubSection.findByIdAndUpdate(subSectionId, updateData, { new: true });

        // Enqueue summary generation job if description or video is updated
        if (isVideoUpdated || isDescriptionUpdated) {
            await summaryQueue.add("lecture-summary", {
                subSectionId: subSectionId,
            });
        }

        const response = await Section.findById(sectionId).populate("subsection").exec();
        
        // return response
        return res.status(200).json({
            success: true,
            message: "Sub section updated successfully",
            response,
        })
    } catch (error) {
        console.log('error in updating sub section' , error);
        res.status(500).json({
            success: false,
            message: "Sub section updated failed",
        })
    }
}

// delete sub section handler
const deleteSubSection = async (req, res) => {
    try {
        // data fetch
        const { subSectionId , sectionId } = req.body;
        // console.log(req.body)

        // data validate
        if(!subSectionId || !sectionId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        
        // delete sub section from section
        await Section.findByIdAndUpdate(sectionId, { $pull: { subsection: subSectionId } });
        
        // sub section delete
        await SubSection.findByIdAndDelete(subSectionId);

        const response = await Section.findById(sectionId).populate("subsection").exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Sub section deleted successfully",
            response,
        })
    } catch (error) {
        console.log('error in deleting sub section' , error);
        res.status(500).json({
            success: false,
            message: "Sub section deletion failed",
        })
    }
}

module.exports = {
    createSubSection,
    updateSubSection,
    deleteSubSection
}