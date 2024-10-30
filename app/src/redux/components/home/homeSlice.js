import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    config: {
      quantity_unit: "", /* quantity unit for default product (prodType 0) */
      company_title: "",
      form_title_template: "",
      num_prod_type: 1,
      required_user_db_version: 2, /* version number to track user db */
      quantity_unit_1: "1",
      quantity_unit_2: "2",
      quantity_unit_3: "3",
      quantity_unit_4: "4",
      quantity_unit_5: "5",
    },
  },
  reducers: {
    updateQuantityUnit(state, action) {
      state.config.quantity_unit = action.payload;
    },
    updateQuantityUnit1(state, action) {
      state.config.quantity_unit_1 = action.payload;
    },
    updateQuantityUnit2(state, action) {
      state.config.quantity_unit_2 = action.payload;
    },
    updateQuantityUnit3(state, action) {
      state.config.quantity_unit_3 = action.payload;
    },
    updateQuantityUnit4(state, action) {
      state.config.quantity_unit_4 = action.payload;
    },
    updateQuantityUnit5(state, action) {
      state.config.quantity_unit_5 = action.payload;
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
                updateQuantityUnit1, updateQuantityUnit2,
                updateQuantityUnit3, updateQuantityUnit4,
                updateQuantityUnit5,
                loadConfig } = homeSlice.actions;

// Export reducer
export default homeSlice.reducer;
