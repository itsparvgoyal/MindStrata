const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const { uploadFileToCloudinary } = require('../utilis/cloudinaryUploader');


// create course handler
const createCourse = async (req, res) => {
    try {
        // Get all data from req body
        const { courseName, courseDescription, price, category, whatYouWillLearn, tag } = req.body;

        // instructor
        const instructor = req.user.id;

        // Get file from req files
        const thumbnail = req.files.thumbnail;
        // console.log(thumbnail)
        // console.log(req)

        // check category valids or not 
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(400).json({
                success: false,
                message: "Category not found",
            })
        }


        // Validate required fields
        if (!courseName || !courseDescription || !price || !instructor || !category || !whatYouWillLearn || !tag) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // upload thumbnail to cloudinary
        const thumbnailUpload = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME, 70);

        // instructor nikal lo 
        const userID = req.user.id;
        const user = await User.findById(userID);

        if (!user || user.accountType !== "Instructor") {
            return res.status(400).json({
                success: false,
                message: "Only instructors can create courses",
            })
        }

        // create course
        const course = await Course.create({
            courseName,
            courseDescription,
            price,
            instructor: user._id,
            category,
            whatYouWillLearn,
            thumbnail: thumbnailUpload.secure_url,
            tag: tag.split(",").map((item) => item.trim())
        })

        // add course to category
        categoryDetails.courses.push(course._id);
        await categoryDetails.save();

        // add course to user
        const userDetails = await User.findById(userID);
        userDetails.courses.push(course._id);
        await userDetails.save();

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            course
        })
    } catch (error) {
        console.log('error in creating course', error);
        res.status(500).json({
            success: false,
            message: "Course creation failed",
        })
    }
}

// update course 
const updateCourse = async (req, res) => {
    try {
        const courseData = req.body;

        const thumbnail = req.files ? req.files.thumbnail : null;
        const courseID = req.params.courseID;

        // get course 
        const course = await Course.findById(courseID);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }

        // update course
        course.courseName = courseData.courseName || course.courseName;
        course.courseDescription = courseData.courseDescription || course.courseDescription;
        course.price = courseData.price || course.price;
        course.category = courseData.category || course.category;
        course.whatYouWillLearn = courseData.whatYouWillLearn || course.whatYouWillLearn;
        course.status = courseData.status || course.status;

        // update thumbnail if provided 
        if (thumbnail) {
            const thumbnailUpload = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME, 70);
            course.thumbnail = thumbnailUpload.secure_url;
        }

        await course.save();

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course
        })
    } catch (error) {
        console.log('error in updating course', error);
        res.status(500).json({
            success: false,
            message: "Course update failed",
        })
    }
}

// delete course handler 
const deleteCourse = async (req, res) => {
    try {
        const { courseID } = req.params;

        // validate data 
        if (!courseID) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            })
        }

        // get course and userID
        const userID = req.user.id;
        const user = await User.findById(userID);

        if (!user || user.accountType !== "Instructor") {
            return res.status(400).json({
                success: false,
                message: "Only instructors can delete courses",
            })
        }
        
        // delete course from all students 
        const students = await Course.findById({courseID}).studentsEnrolled;

        for (let i = 0; i < students.length; i++) {
            const student = await User.findById(students[i]);
            student.courses = student.courses.filter((course) => course._id !== courseID);
            await student.save();
        }

        // delete course from user
        user.courses = user.courses.filter((course) => course._id !== courseID);
        await user.save();

        // remove from category 
        const category = await Category.findById(course.category);
        if(category){
            category.courses = category.courses.filter((course) => course._id !== courseID);
            await category.save();
        }
        
        // delete course 
        await Course.findByIdAndDelete(courseID);


        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    } catch (error) {
        console.log('error in deleting course', error);
        res.status(500).json({
            success: false,
            message: "Course deletion failed",
        })
    }
}

// helper fucn's

// get all courses handler
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({}).populate("instructor").populate("category").populate({
            path: "courseContent",
            populate: {
                path: "subsection",
            }
        }).populate("tag").exec();
        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            courses
        })
    } catch (error) {
        console.log('error in fetching courses', error);
        res.status(500).json({
            success: false,
            message: "Courses fetching failed",
        })
    }
}

// get course details 
const getCourseDetails = async (req, res) => {
    try {
        const { courseID } = req.params;

        // validate data 
        if (!courseID) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            })
        }

        // get course
        const course = await Course.findById(courseID).populate("instructor").populate("tag").populate({
            path: "courseContent",
            populate: {
                path: "subsection",
            }
        }).exec();


        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            course
        })

    } catch (error) {
        console.log('error in fetching course details', error);
        res.status(500).json({
            success: false,
            message: "Course details fetching failed",
        })
    }
}

// get enrolled courses 
const getEnrolledCourses = async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const enrolledCourses = await Course.find({ _id: { $in: user.courses } }).populate("instructor").populate("category").populate({
            path: "courseContent",
            populate: {
                path: "subsection",
            }
        }).populate("tag").exec();

        return res.status(200).json({
            success: true,
            message: "Enrolled courses fetched successfully",
            enrolledCourses
        })
    } catch (error) {
        console.log('error in fetching enrolled courses', error);
        res.status(500).json({
            success: false,
            message: "Enrolled courses fetching failed",
        })
    }
}

// helper fucn 
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

const durationToSeconds = (duration) => {
    let totalSeconds = 0;

    const hourMatch = duration.match(/(\d+)h/);
    const minuteMatch = duration.match(/(\d+)m/);
    const secondMatch = duration.match(/(\d+)s/);

    if (hourMatch) totalSeconds += parseInt(hourMatch[1]) * 3600;
    if (minuteMatch) totalSeconds += parseInt(minuteMatch[1]) * 60;
    if (secondMatch) totalSeconds += parseInt(secondMatch[1]);

    return totalSeconds;
};

// get courseDuration 
const getCourseDuration = async (req, res) => {
    try {
        // console.log("req", req)
        const { courseID } = req.params;

        if (!courseID) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }

        const course = await Course.findById(courseID)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subsection",
                },
            })
            .exec();

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        let totalSeconds = 0;

        course.courseContent.forEach((section) => {
            section.subsection.forEach((subSection) => {
                if (subSection.timeDuration) {
                    totalSeconds += durationToSeconds(
                        subSection.timeDuration
                    );
                }
            });
        });

        const courseDuration = formatDuration(totalSeconds);

        return res.status(200).json({
            success: true,
            message: "Course duration fetched successfully",
            courseDuration,
        });

    } catch (error) {
        console.log("error in fetching course duration", error);

        return res.status(500).json({
            success: false,
            message: "Course duration fetching failed",
        });
    }
};


module.exports = {
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    getCourseDetails,
    getEnrolledCourses,
    getCourseDuration,
}