import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    selectedCompID: 0,
    selectedProdID: 0,
    selectedFormID: 0,
  },
  reducers: {
    changeSelectedFormID(state, action) {
      state.selectedFormID = action.payload;
    },
    changeSelectedCompID(state, action) {
      state.selectedCompID = action.payload;
    },
    changeSelectedProdID(state, action) {
      state.selectedProdID = action.payload;
    }
  }
});

// Export actions
export const { changeSelectedFormID, changeSelectedCompID, changeSelectedProdID } = homeSlice.actions;

// Export reducer
export default homeSlice.reducer;
