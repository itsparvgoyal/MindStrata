import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        // verify payement ke lie likha 
        // koi issue aaye waha se check kro payement->verify->frontend 
        updateUser(state, action) {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
            // console.log("user updated in local storage")
        }
    },
});

export const { setUser, setLoading, setToken, updateUser } = authSlice.actions;
export default authSlice.reducer;