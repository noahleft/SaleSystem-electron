import { createSlice } from "@reduxjs/toolkit";

const productManagerSlice = createSlice({
  name: "productManager",
  initialState: {
    candidateProdID: 0,
  },
  reducers: {
    changeCandidateProdID(state, action) {
      state.candidateProdID = action.payload;
    },
  }
});

// Export actions
export const { changeCandidateProdID } = productManagerSlice.actions;

// Export reducer
export default productManagerSlice.reducer;
