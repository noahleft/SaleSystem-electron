import { createSlice } from "@reduxjs/toolkit";

const exportManagerSlice = createSlice({
  name: "exportManager",
  initialState: {
    exportList: [],
    selectedCompID: 0,
    needTax: false,
  },
  reducers: {
    updateExportList(state, action) {
      state.exportList = action.payload;
      state.selectedCompID = 0;
      state.needTax = false;
    },
    changeSelectedCompID(state, action) {
      state.selectedCompID = action.payload;
      state.needTax = false;
    },
    changeNeedTax(state, action) {
      state.needTax = action.payload;
    }
  }
});

// Export actions
export const { updateExportList, changeSelectedCompID, changeNeedTax } = exportManagerSlice.actions;

// Export reducer
export default exportManagerSlice.reducer;
