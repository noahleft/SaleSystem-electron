import { createSlice } from "@reduxjs/toolkit";

const companyManagerSlice = createSlice({
  name: "companyManager",
  initialState: {
    selectedCompID: 1,
  },
  reducers: {
    changeSelectedCompID(state, action) {
      state.selectedCompID = action.payload;
    },
  }
});

// Export actions
export const { changeSelectedCompID } = companyManagerSlice.actions;

// Export reducer
export default companyManagerSlice.reducer;
