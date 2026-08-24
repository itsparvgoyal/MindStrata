const mongoose = require("mongoose");


const SubSectionSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
    },
    timeDuration:{
        type:String,
    },
    videoUrl:{
        type:String,
    },
    description:{
        type:String,
        trim:true,
    },
    summary:{
        type:String,
        default:null,
    },
    summaryStatus: {
      type: String,
      enum: [
        "PENDING",
        "PROCESSING",
        "COMPLETED",
        "FAILED",
      ],
      default: "PENDING",
    },
    summaryError: {
        type: String,
        default: null,
    },
    summaryGeneratedAt: {
        type: Date,
        default: null,
    },
    extractedQuestions:{
        type: String,
        default: null,
    },
    questionsStatus: {
      type: String,
     enum: [
      "PENDING",
      "PROCESSING",
      "COMPLETED",
      "FAILED",
     ],
     default: "PENDING",
    },
    questionsError: {
      type: String,
      default: null,
    },
    questionsGeneratedAt: {
      type: Date,
      default: null,
    },
} , {timestamps:true});

const SubSection = mongoose.model("SubSection", SubSectionSchema);
module.exports = SubSection;