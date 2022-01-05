import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    message: "undefined",
    selectedFormID: 0,
    selectedCompID: 0,
  },
  reducers: {
    changeMessage(state, action) {
      state.message = action.payload;
    },
    changeSelectedFormID(state, action) {
      state.selectedFormID = action.payload;
    },
    changeSelectedCompID(state, action) {
      state.selectedCompID = action.payload;
    }
  }
});

// Export actions
export const { changeMessage, changeSelectedFormID, changeSelectedCompID } = homeSlice.actions;

// Export reducer
export default homeSlice.reducer;
