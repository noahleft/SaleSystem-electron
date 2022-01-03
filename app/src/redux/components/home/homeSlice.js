import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    message: "undefined"
  },
  reducers: {
    changeMessage(state, action) {
      state.message = action.payload;
    }
  }
});

// Export actions
export const { changeMessage } = homeSlice.actions;

// Export reducer
export default homeSlice.reducer;
