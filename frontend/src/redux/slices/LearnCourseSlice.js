import { createSlice } from "@reduxjs/toolkit";
import { Loader } from "lucide-react";

const initialState = {
    loading:false,
    courseEnrolledData: null,
    courseSectionData: [],
    totalLectures: 0,
    completedLectures: [],
    currSubSecId:null,
    currSectionId:null,
}

const LearnCourseSlice = createSlice({
    name: "LearnCourse",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setCourseEnrolledData: (state, action) => {
            state.courseEnrolledData = action.payload;
        },
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload;
        },
        setTotalLectures: (state, action) => {
            state.totalLectures = action.payload;
        },
        setCompletedLectures: (state, action) => {
            state.completedLectures = action.payload;
        },
       setUpdatedCompletedLectures: (state, action) => {
        if(!state.completedLectures.includes(action.payload)){
            state.completedLectures.push(action.payload);
        }
       },
       setCurrSubSecId: (state, action) => {
        state.currSubSecId = action.payload;
       },
       setCurrSectionId: (state, action) => {
        state.currSectionId = action.payload;
       }
    },
})

export const { setLoading, setCourseEnrolledData, setCourseSectionData, setTotalLectures, setCompletedLectures, setUpdatedCompletedLectures , setCurrSubSecId , setCurrSectionId } = LearnCourseSlice.actions
export default LearnCourseSlice.reducer