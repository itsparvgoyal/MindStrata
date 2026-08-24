const Section = require('../models/Section');
const Course = require('../models/Course');


// create section handler
const createSection = async (req, res) => {
    try {
        // data fetch
        const { sectionName, courseId } = req.body;
        // data validate
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // section create
        const section = await Section.create({
            sectionName
        })
        
        // add section to course
        const course = await Course.findById(courseId);
        course.courseContent.push(section._id);
        await course.save();
        
        // return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            section
         })
    } catch (error) {
        console.log('error in creating section' , error);
        res.status(500).json({
            success: false,
            message: "Section creation failed",
        })
    }
}

// update section handler
const updateSection = async (req, res) => {
    try {
        // data fetch
        const { sectionName , sectionId} = req.body;
        // data validate
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        // update section
        const section = await Section.findByIdAndUpdate(sectionId, { sectionName } , {new : true});
        // return response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            section,
        })
    } catch (error) {
        console.log('error in updating section' , error);
        res.status(500).json({
            success: false,
            message: "Section update failed",
        })
    }
}

// delete section handler
const deleteSection = async (req, res) => {
    try {
        // data fetch
        // console.log(req.body)
        const {sectionId , courseId} = req.body;
        // data validate
        if(!sectionId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // delete section
        const section = await Section.findByIdAndDelete(sectionId);
        
        // delete section from course
        await Course.findByIdAndUpdate(courseId, { $pull: { courseContent: sectionId } });
        
        // return response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            section,
        })
    } catch (error) {
        console.log('error in deleting section' , error);
        res.status(500).json({
            success: false,
            message: "Section deletion failed",
        })
    }
}

// get section details 
const getSectionDetails = async (req, res) => {
    try {
        // data fetch
        const { sectionId } = req.body;
        // data validate
        if(!sectionId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        // get section 
        const sectionDetails = await Section.findById(sectionId).populate("subsection").exec();
        // return response
        return res.status(200).json({
            success: true,
            message: "Section details fetched successfully",
            sectionDetails,
        })
    } catch (error) {
        console.log('error in getting section details' , error);
        res.status(500).json({
            success: false,
            message: "Section details fetching failed",
        })
    }
}


module.exports = {
    createSection,
    updateSection,
    deleteSection,
    getSectionDetails     
}