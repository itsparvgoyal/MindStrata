const User = require("../models/User");
const mongoose = require("mongoose");

const CourseProgressSchema = new mongoose.Schema({
    courseID : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    userID : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    completedLectures:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"subSection"
        }
    ]
} , {timestamps:true})

const CourseProgress = mongoose.model("CourseProgress", CourseProgressSchema);
module.exports = CourseProgress;
