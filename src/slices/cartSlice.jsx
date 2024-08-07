import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  cartTotalAmount: localStorage.getItem("cartTotalAmount") ? JSON.parse(localStorage.getItem("cartTotalAmount")) : 0,
  cartTotalCourse: localStorage.getItem("cartTotalCourse") ? JSON.parse(localStorage.getItem("cartTotalCourse")) : 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload
      const index = state.cart.findIndex((item) => item._id === course._id)

      if (index >= 0) {
        // If the course is already in the cart, do not modify the quantity
        toast.error("Course already in cart")
        return
      }
      // If the course is not in the cart, add it to the cart
      state.cart.push(course)
      // Update the total quantity and price
      state.cartTotalCourse++
      state.cartTotalAmount += parseFloat(course.price)
      // Update to localstorage
      localStorage.setItem("cart", JSON.stringify(state.cart))
      localStorage.setItem("cartTotalAmount", JSON.stringify(state.cartTotalAmount))
      localStorage.setItem("cartTotalCourse", JSON.stringify(state.cartTotalCourse))
      // show toast
      toast.success("Course added to cart")
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload
      const index = state.cart.findIndex((item) => item._id === courseId)

      if (index >= 0) {
        // If the course is found in the cart, remove it
        state.cartTotalCourse--
        state.cartTotalAmount -= parseFloat(state.cart[index].price)
        state.cart.splice(index, 1)
        // Update to localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("cartTotalAmount", JSON.stringify(state.cartTotalAmount))
        localStorage.setItem("cartTotalCourse", JSON.stringify(state.cartTotalCourse))
        // show toast
        toast.success("Course removed from cart")
      }
    },
    resetCart: (state) => {
      state.cart = []
      state.cartTotalAmount = 0
      state.cartTotalCourse = 0
      // Update to localstorage
      localStorage.removeItem("cart")
      localStorage.removeItem("cartTotalAmount")
      localStorage.removeItem("cartTotalCourse")
    },
  },
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions

export default cartSlice.reducer;