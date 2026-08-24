const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");

// update lecture 
const updateCourseProgress = async (req, res) => {
    try {
        const {subSectionId , courseId} = req.body;
        // checking if the user has bought the course or not 
        const user = await User.findById(req.user.id);
        if (!user.courses.includes(courseId)) {
            return res.status(404).json({
                success: false,
                message: "You have not bought this course",
            });
        }

        let progress = await CourseProgress.findOne({courseID: courseId , userID: req.user.id});
        if (!progress) {
            progress = await CourseProgress.create({courseID: courseId, userID: req.user.id, completedLectures: [],});
        }

        if(progress.completedLectures.includes(subSectionId)){
            return res.status(200).json({
                success: true,
                message: "Already marked as completed",
            });
        }

        progress.completedLectures.push(subSectionId);
        await progress.save();

        // add it to user 
        const updatedUser = await User.findByIdAndUpdate(req.user.id, { $push: { courseProgress: progress._id } }, { new: true });

        res.status(200).json({
            success: true,
            message: "Marked successfully",
            data: progress,
        });
    } catch (error) {
        console.log("Error in updateCourseProgress: ", error);
        res.status(500).json({
            success: false,
            message: "Error in updating course progress",
        });
    }
}

// find progress controller 
const getCourseProgress = async (req, res) => {
    try {
        const {courseId} = req.params;
        const userId = req.user.id;
        const progress = await CourseProgress.findOne({courseID: courseId , userID:userId});
        
        if (!progress) {
            return res.status(404).json({
                success: false,
                message: "No Progress yet",
            });
        }
        res.status(200).json({
            success: true,
            message: "Progress fetched successfully",
            data: progress,
        });
    } catch (error) {
        console.log("Error in getCourseProgress: ", error);
        res.status(500).json({
            success: false,
            message: "Error in fetching progress",
        });
    }
}

module.exports = {updateCourseProgress, getCourseProgress}