import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const wishlistSlice  = createSlice({
    name: "wishlist",
    initialState: {
        wishlist: localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")) : [],
        loading: false,
        wishlistTotalCourse: localStorage.getItem('wishlistTotalCourse') ? JSON.parse(localStorage.getItem('wishlistTotalCourse')) : 0,
        wishlistTotalAmount: localStorage.getItem('wishlistTotalAmount') ? JSON.parse(localStorage.getItem('wishlistTotalAmount')) : 0,
    },
    reducers: {
        setLoading: (action, payload) => {
            action.loading = payload
        },
        addToWishlist: (state, action) => {
            const course = action.payload
            const index = state.wishlist.findIndex((item) => item._id === course._id)

            if (index >= 0) {
                toast.error("Course already in Wishlist")
                return
            }

            state.wishlist.push(course)
            state.wishlistTotalAmount += parseFloat(course.price);
            state.wishlistTotalCourse++;
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist))
            localStorage.setItem('wishlistTotalAmount', JSON.stringify(state.wishlistTotalAmount))
            localStorage.setItem('wishlistTotalCourse', JSON.stringify(state.wishlistTotalCourse))
            toast.success("Course added to Wishlist");
        },
        removeFromWishlist: (state, action) => {
            const courseId = action.payload
            const index = state.wishlist.findIndex((item) => item._id === courseId)

            if (index >= 0) {
                state.wishlistTotalCourse--;
                state.wishlistTotalAmount -= parseFloat(state.wishlist[index].price);
                state.wishlist.splice(index, 1)
                localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
                localStorage.setItem('wishlistTotalAmount', JSON.stringify(state.wishlistTotalAmount))
                localStorage.setItem('wishlistTotalCourse', JSON.stringify(state.wishlistTotalCourse))
                toast.success("Course removed from Wishlist")
            }
        },
        resetWishlist: (state, action) => {
            state.wishlist = []
            state.wishlistTotalAmount = 0
            state.wishlistTotalCourse = 0
            localStorage.removeItem('wishlist')
            localStorage.removeItem('wishlistTotalAmount')
            localStorage.removeItem('wishlistTotalCourse')
        }
    },
})

export const { setLoading, addToWishlist, removeFromWishlist, resetWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer;