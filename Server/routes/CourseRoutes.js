const express = require("express");
const router = express.Router();

const {auth , isInstructor} = require("../middlewares/auth");
const {createCourse , updateCourse , deleteCourse , getAllCourses , getCourseDetails , getEnrolledCourses , getCourseDuration} = require("../controllers/Course");
const {createSection , updateSection , deleteSection , getSectionDetails} = require("../controllers/Section");
const {createSubSection , updateSubSection , deleteSubSection} = require("../controllers/SubSection");
const {createCategory , getAllCategories , editCategory , deleteCategory} = require("../controllers/Category");


// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);
// update course 
router.put("/updateCourse/:courseID", auth, isInstructor, updateCourse);
// delete course 
router.delete("/deleteCourse/:courseID", auth, isInstructor, deleteCourse);
// get duration 
router.get("/getCourseDuration/:courseID", getCourseDuration);


// Add a Section to a Course
router.post("/createSection", auth, isInstructor, createSection);
// Update a Section
router.put("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.delete("/deleteSection", auth, isInstructor, deleteSection);
// get section details 
router.post("/getSectionDetails", getSectionDetails);


// Add a Sub Section to a Section
router.post("/createSubSection", auth, isInstructor, createSubSection);
// Edit Sub Section
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);


// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Course
router.get("/getCourseDetails/:courseID", getCourseDetails);
// get enrolled courses 
router.get("/getEnrolledCourses", auth, getEnrolledCourses);


// category routes 
router.post("/createCategory", auth, isInstructor, createCategory);
router.get("/getAllCategories", getAllCategories);
router.put("/editCategory", auth, isInstructor, editCategory);
router.delete("/deleteCategory", auth, isInstructor, deleteCategory);   

module.exports = router;