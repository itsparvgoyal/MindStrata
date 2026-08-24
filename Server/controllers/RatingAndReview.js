const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');

// create rating and review
const createRatingAndReview = async (req, res) => {
    try {
        const { rating, review, courseID } = req.body;
        const userID = req.user.id;

        // validate data
        if(!rating || !review || !courseID){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        
        // check course exist or not 
        const course = await Course.findById(courseID);
        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }
        
        // check if user is enrolled in course
        if(!course.studentsEnrolled.includes(userID)){
            return res.status(400).json({
                success: false,
                message: "User is not enrolled in the course",
            })
        }

        // check if user has already rated
        const existingRating = await RatingAndReview.findOne({course: courseID, user: userID});
        if(existingRating){
            return res.status(400).json({
                success: false,
                message: "User has already rated the course",
            })
        }

        // create rating and review
        const ratingAndReview = await RatingAndReview.create({
            rating,
            review,
            course: courseID,
            user: userID,
        });

        // update course rating
        course.ratingAndReviews.push(ratingAndReview._id);
        await course.save();

        return res.status(200).json({
            success: true,
            message: "Rating and review created successfully",
            ratingAndReview,
        });
    } catch (error) {
        console.log('error in creating rating and review' , error);
        res.status(500).json({
            success: false,
            message: "Rating and review creation failed",
        })
    }
} 

// get all rating and reviews
const getAllRatingAndReviews = async (req, res) => {
    try {
        const ratingAndReviews = await RatingAndReview.find({}).populate("course").populate("user").exec();
        return res.status(200).json({
            success: true,
            message: "Rating and reviews fetched successfully",
            ratingAndReviews,
        });
    } catch (error) {
        console.log('error in fetching rating and reviews' , error);
        res.status(500).json({
            success: false,
            message: "Rating and reviews fetching failed",
        })
    }
} 

module.exports = {createRatingAndReview , getAllRatingAndReviews};