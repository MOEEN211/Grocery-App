import { configureStore } from "@reduxjs/toolkit";
import cartReducer2 from "./CartSlice2";
import wishlistReducer from "./WishlistSlice";
import addressReducer from "./AddressSlice"; // Import the new slice

const myStore2 = configureStore({
  reducer: {
    cart2: cartReducer2,
    wishlist: wishlistReducer,
    address: addressReducer, // Add the new address slice to the reducer
  },
});

export default myStore2;
