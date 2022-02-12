import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    quantity_unit: "",
  },
  reducers: {
    updateQuantityUnit(state, action) {
      state.quantity_unit = action.payload;
    }
  }
});

// Export actions
export const { updateQuantityUnit } = homeSlice.actions;

// Export reducer
export default homeSlice.reducer;
