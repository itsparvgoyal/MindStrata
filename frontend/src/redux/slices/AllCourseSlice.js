import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    course : null,
    duration : 0 ,
    role : null , 
    enrolledCoursesByUser : [],
}

const courseSlice = createSlice({
    name : "course",
    initialState,
    reducers : {
        setCourse : (state , action) => {
            state.course = action.payload;
        },
        setDuration : (state , action) => {
            state.duration = action.payload;
        },
        setRole : (state , action) => {
            state.role = action.payload;
        },
        setEnrolledCourses : (state , action) => {
            state.enrolledCoursesByUser = action.payload;
        },
    }
})

export const {setCourse  , setDuration , setRole , setEnrolledCourses} = courseSlice.actions;
export default courseSlice.reducer;
