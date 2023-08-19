import {
  REMOVE_FROM_CART,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  ADD_TO_CART,
} from "../ActionType";

export const addItemToCart = (data) => ({
  type: ADD_TO_CART,
  payload: data,
});

export const removeFromCart = (index) => ({
  type: REMOVE_FROM_CART,
  payload: index,
});

export const addWishlistToCart = (data) => ({
  type: ADD_TO_WISHLIST,
  payload: data,
});

export const removeFromWishList = (index) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: index,
});
