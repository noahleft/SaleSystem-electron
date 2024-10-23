import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    config: {
      quantity_unit: "", /* quantity unit for default product (prodType 0) */
      company_title: "",
      form_title_template: "",
      num_prod_type: 1,
      required_user_db_version: 1, /* version number to track user db */
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
    updateNumProdType(state, action) {
      state.config.num_prod_type = action.payload;
    },
    loadConfig(state, action) {
      state.config = action.payload;
    }
  }
});

// Export actions
export const {  updateQuantityUnit, updateCompanyTitle,
                updateFormTitleTemplate, updateNumProdType,
                loadConfig } = homeSlice.actions;

// Export reducer
export default homeSlice.reducer;
