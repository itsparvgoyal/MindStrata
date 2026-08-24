import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        }
    },
});

export const { setToken } = profileSlice.actions;
export default profileSlice.reducer;