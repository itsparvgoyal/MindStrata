const mongoose = require("mongoose");


const CourseSchema = new mongoose.Schema({
    
    courseName:{
        type:String,
        trim:true,
    },
    courseDescription:{
        type:String,
        trim:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    price:{
        type:Number,
    },
    whatYouWillLearn:{
        type:String,
        trim:true,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    thumbnail:{
        type:String,
    },
    tag:{
        type:[String],
        trim:true,
    },
    status:{
        type:String,
        enum:["Draft","Published"],
        default:"Draft",
    }
} , {timestamps:true});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;