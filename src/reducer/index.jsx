import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import cartSlice from "../slices/cartSlice";
import ProfileSlice from "../slices/ProfileSlice";
import contactSlice  from "../slices/ContactSlice";
import WishlistSlice from "../slices/WishlistSlice";
import courseSlice from "../slices/courseSlice";
import viewCourseSlice from "../slices/viewCourseSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    cart: cartSlice,
    profile: ProfileSlice,
    contact: contactSlice,
    wishlist: WishlistSlice,
    course: courseSlice,
    viewCourse: viewCourseSlice
})

export default rootReducer;