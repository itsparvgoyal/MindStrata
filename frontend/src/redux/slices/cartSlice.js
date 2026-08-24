import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  items: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart(state, action) {
      const exists = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (exists) {
        toast.error("Item already in cart");
        return;
      }

      state.items.push(action.payload);
      state.totalItems = state.items.length;

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );

      toast.success("Item added to cart");
    },

    removeFromCart(state, action) {
      const exists = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (!exists) {
        toast.error("Item not in cart");
        return;
      }

      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );

      state.totalItems = state.items.length;

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );

      toast.success("Item removed from cart");
    },

    resetCart(state) {
      state.items = [];
      state.totalItems = 0;

      localStorage.setItem(
        "cartItems",
        JSON.stringify([])
      );

      // toast.success("Cart reset");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;