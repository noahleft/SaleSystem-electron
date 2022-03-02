import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    quantity_unit: "",
    company_title: "",
  },
  reducers: {
    updateQuantityUnit(state, action) {
      state.quantity_unit = action.payload;
    },
    updateCompanyTitle(state, action) {
      state.company_title = action.payload;
    }
  }
});

// Export actions
export const { updateQuantityUnit, updateCompanyTitle } = homeSlice.actions;

// Export reducer
export default homeSlice.reducer;
