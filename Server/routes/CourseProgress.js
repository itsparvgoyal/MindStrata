const express = require("express");
const router = express.Router();
const { updateCourseProgress , getCourseProgress} = require("../controllers/CourseProgress");
const { auth, isStudent } = require("../middlewares/auth");

router.put("/updateCourseProgress", auth, isStudent, updateCourseProgress);
router.get("/getCourseProgress/:courseId", auth, isStudent, getCourseProgress);


module.exports = router;