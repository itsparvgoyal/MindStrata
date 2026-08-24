import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import courseReducer from "../slices/courseSlice";
import sectionReducer from "../slices/sectionSlice";
import LearnCourseReducer from "../slices/LearnCourseSlice";
import allCourseReducer from "../slices/AllCourseSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course: courseReducer,
    section:sectionReducer,
    learn: LearnCourseReducer,
    allCourse : allCourseReducer,
});

export default rootReducer;
