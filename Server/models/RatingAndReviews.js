const mongoose = require("mongoose");

const RatingAndReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    }
});

const RatingAndReview = mongoose.model("RatingAndReview", RatingAndReviewSchema);
module.exports = RatingAndReview;