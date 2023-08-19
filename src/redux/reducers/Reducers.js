import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
} from "../ActionType";

const reducers = (state = { cart: [], wishlist: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_FROM_CART:
      const deletedCartArray = state.cart.filter((item, index) => {
        return index !== action.payload;
      });
      return {
        ...state,
        cart: deletedCartArray,
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case REMOVE_FROM_WISHLIST:
      const deletedWishlistArray = state.wishlist.filter((item, index) => {
        return index !== action.payload;
      });
      return {
        ...state,
        wishlist: deletedWishlistArray,
      };
    default:
      return state;
  }
};

export default reducers;
