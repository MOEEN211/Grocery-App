import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const AddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress: (state, action) => {
      state.push(action.payload);
    },
    deleteAddress: (state, action) => {
      return state.filter((address, index) => index !== action.payload);
    },
  },
});

export const { addAddress, deleteAddress } = AddressSlice.actions;
export default AddressSlice.reducer;
