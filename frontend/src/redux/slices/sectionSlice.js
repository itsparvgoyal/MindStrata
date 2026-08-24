import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    section: [],
    isEditing: false,
};

const sectionSlice = createSlice({
    name:"section",
    initialState,
    reducers:{
        setSection:(state, action) => {
            state.section = action.payload;
        },

        addSection : (state, action) => {
            state.section.push(action.payload);
        },

        updateSection: (state, action) => {
            const { sectionId, sectionName } = action.payload;
            const section = state.section.find(
                (sec) => sec._id === sectionId
            );
            if(section){
                section.sectionName = sectionName;
            }
        },

        deleteSection : (state, action) => {
            state.section = state.section.filter((section) => section._id !== action.payload);
        },

        setEditing: (state, action) => {
            state.isEditing = action.payload;
        },
        
        replaceSection: (state, action) => {
        const updatedSection = action.payload;

        const index = state.section.findIndex(
            (sec) => sec._id === updatedSection._id
        );

        if(index !== -1){
            state.section[index] = updatedSection;
        }
        },

        resetSectionState : (state) => {
            state.section = [];
            state.isEditing = false;
        }
    }
});

export const { setSection , addSection , updateSection ,deleteSection , setEditing , replaceSection , resetSectionState } = sectionSlice.actions;
export default sectionSlice.reducer;