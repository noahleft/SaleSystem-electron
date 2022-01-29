import { createSlice } from "@reduxjs/toolkit";

const exportManagerSlice = createSlice({
  name: "exportManager",
  initialState: {
    exportList: [],
    selectedCompID: 0,
  },
  reducers: {
    updateExportList(state, action) {
      state.exportList = action.payload;
    },
    changeSelectedCompID(state, action) {
      state.selectedCompID = action.payload;
    },
  }
});

// Export actions
export const { updateExportList, changeSelectedCompID } = exportManagerSlice.actions;

// Export reducer
export default exportManagerSlice.reducer;
