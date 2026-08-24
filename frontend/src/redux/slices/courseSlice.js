import { createSlice } from "@reduxjs/toolkit"

// create course ki slice hai ye

const initialState = {
  step: 1,
  course: null,
  editCourse: false,
  loading: false,
}

const courseSlice = createSlice({
  name: "course",
  initialState,

  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },

    setCourse: (state, action) => {
      state.course = action.payload
    },

    setEditCourse: (state, action) => {
      state.editCourse = action.payload
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    },

    resetCourseState: (state) => {
      state.step = 1
      state.course = null
      state.editCourse = false
      state.loading = false
    },
  },
})

export const {
  setStep,
  setCourse,
  setEditCourse,
  setLoading,
  resetCourseState,
} = courseSlice.actions

export default courseSlice.reducer