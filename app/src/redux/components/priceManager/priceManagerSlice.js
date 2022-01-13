import { createSlice } from "@reduxjs/toolkit";

const priceManagerSlice = createSlice({
  name: "priceManager",
  initialState: {
    candidatePriceID: 0,
  },
  reducers: {
    changeCandidatePriceID(state, action) {
      state.candidatePriceID = action.payload;
    },
  }
});

// Export actions
export const { changeCandidatePriceID } = priceManagerSlice.actions;

// Export reducer
export default priceManagerSlice.reducer;
