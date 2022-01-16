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
      let priceItemList = state.priceList.filter(function(obj){
        if(obj.COMP_ID == CR.COMP_ID && obj.PROD_ID == CR.PROD_ID) return true;
        return false;
      });
      if(priceItemList.length==0) {
        var item = {
          COMP_ID: CR.COMP_ID,
          PROD_ID: CR.PROD_ID,
          UNIT_PRICE: CR.UNIT_PRICE,
        };
        state.priceList.push(item);
        CR.ID = 0; /* 0 means not exist in PriceList */
      }
      state.priceList.forEach(function(obj){
        if(obj.COMP_ID == CR.COMP_ID && obj.PROD_ID == CR.PROD_ID) {
          obj.UNIT_PRICE = CR.UNIT_PRICE;
          obj.DIRTY = true;
        }
      });

      state.changeRequests.push(CR);
    }
  }
});

// Export actions
export const { updatePriceList, changeSelectedCompID, addChangeRequest } = priceManagerSlice.actions;

// Export reducer
export default priceManagerSlice.reducer;
