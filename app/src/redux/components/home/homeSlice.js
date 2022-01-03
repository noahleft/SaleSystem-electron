import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    message: "undefined",
    selectedFormID: 0
  },
  reducers: {
    changeMessage(state, action) {
      state.message = action.payload;
    },
    changeSelectedFormID(state, action) {
      state.selectedFormID = action.payload;
    }
  }
});

// Export actions
export const { changeMessage, changeSelectedFormID } = homeSlice.actions;

// Export reducer
export default homeSlice.reducer;
