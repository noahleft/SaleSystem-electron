import { createSlice } from "@reduxjs/toolkit";

const priceManagerSlice = createSlice({
  name: "priceManager",
  initialState: {
    priceList: [],
    selectedCompID: 0,
    changeRequests: [],
  },
  reducers: {
    updatePriceList(state, action) {
      state.priceList = action.payload;
      state.changeRequests = [];
    },
    changeSelectedCompID(state, action) {
      state.selectedCompID = action.payload;
    },
    addChangeRequest(state, action) {
      let CR = action.payload;
      state.changeRequests.push(CR);
    }
  }
});

// Export actions
export const { updatePriceList, changeSelectedCompID, addChangeRequest } = priceManagerSlice.actions;

// Export reducer
export default priceManagerSlice.reducer;
