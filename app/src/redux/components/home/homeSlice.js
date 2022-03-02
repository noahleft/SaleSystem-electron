import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    config: {
      quantity_unit: "",
      company_title: "",
    },
  },
  reducers: {
    updateQuantityUnit(state, action) {
      state.config.quantity_unit = action.payload;
    },
    updateCompanyTitle(state, action) {
      state.config.company_title = action.payload;
    },
    loadConfig(state, action) {
      state.config = action.payload;
    }
  }
});

// Export actions
export const { updateQuantityUnit, updateCompanyTitle, loadConfig } = homeSlice.actions;

// Export reducer
export default homeSlice.reducer;
