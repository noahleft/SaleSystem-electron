import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    config: {
      quantity_unit: "",
      company_title: "",
      form_title_template: "",
    },
  },
  reducers: {
    updateQuantityUnit(state, action) {
      state.config.quantity_unit = action.payload;
    },
    updateCompanyTitle(state, action) {
      state.config.company_title = action.payload;
    },
    updateFormTitleTemplate(state, action) {
      state.config.form_title_template = action.payload;
    },
    loadConfig(state, action) {
      state.config = action.payload;
    }
  }
});

// Export actions
export const { updateQuantityUnit, updateCompanyTitle, updateFormTitleTemplate, loadConfig } = homeSlice.actions;

// Export reducer
export default homeSlice.reducer;
