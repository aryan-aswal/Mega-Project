import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    signupData: null,
}; 

export const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
    }
})

export const {setToken, setLoading, setSignupData } = authSlice.actions;
export default authSlice.reducer;