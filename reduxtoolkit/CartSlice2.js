import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const CartSlice2 = createSlice({
  name: "cart2",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.push(action.payload);
    },
    addToCart: (state, action) => {
      state.push(action.payload); // Add the item to the cart
    },
    removeCartItem: (state, action) => {
      return state.filter((item, index) => index !== action.payload);
    },
  },
});

export const { addCartItem, addToCart, removeCartItem } = CartSlice2.actions;
export default CartSlice2.reducer;
