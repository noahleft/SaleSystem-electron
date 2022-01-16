import { createSlice } from "@reduxjs/toolkit";

const productManagerSlice = createSlice({
  name: "productManager",
  initialState: {
    productList: [],
    candidateProdID: 1,
    changeRequests: [],
  },
  reducers: {
    updateProductList(state, action) {
      state.productList = action.payload;
      state.changeRequests = [];
    },
    changeCandidateProdID(state, action) {
      state.candidateProdID = action.payload;
    },
    addChangeRequest(state, action) {
      let CR = action.payload;
      state.changeRequests.push(CR);
      if(state.productList.length < Number(CR.ID)) {
        let productItem = {
          ID: Number(CR.ID),
          NAME: CR.NAME,
          DIRTY: false,
        }
        state.productList.push(productItem);
      }
      state.productList.forEach(function(obj) {
        if(obj.ID == CR.ID) {
          obj.NAME = CR.NAME;
          obj.DIRTY = true;
        }
      });
    },
  }
});

// Export actions
export const { updateProductList, changeCandidateProdID, addChangeRequest } = productManagerSlice.actions;

// Export reducer
export default productManagerSlice.reducer;
