import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
}
export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const { setLoading } = contactSlice.actions;
export default contactSlice.reducer;
