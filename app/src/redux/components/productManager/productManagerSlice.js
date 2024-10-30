import { createSlice } from "@reduxjs/toolkit";

const productManagerSlice = createSlice({
  name: "productManager",
  initialState: {
    productList: [],
    originalList: [],
    candidateProdListIdx: -1,
    requireSaving: false,
    showAllProduct: true,
  },
  reducers: {
    updateProductList(state, action) {
      state.productList = action.payload;
      state.originalList = action.payload;
      state.candidateProdListIdx = -1;
      state.requireSaving = false;
    },
    addDummyProduct(state, action) {
      state.productList = [...state.productList, action.payload];
      state.originalList = [...state.originalList, action.payload];
      state.requireSaving = true;
    },
    changeCandidateProdListIdx(state, action) {
      state.candidateProdListIdx = action.payload;
    },
    changeCandidateProdName(state, action) {
      const idx = action.payload.idx;
      const val = action.payload.value;
      state.productList[idx].NAME = val;
      state.productList[idx].DIRTY = true;
      state.requireSaving = true;
    },
    changeCandidateProdType(state, action) {
      const idx = action.payload.idx;
      const val = action.payload.value;
      state.productList[idx].TYPE = val;
      state.productList[idx].DIRTY = true;
      state.requireSaving = true;
    },
    changeCandidateProdGroupID(state, action) {
      const idx = action.payload.idx;
      const val = action.payload.value;
      state.productList[idx].GROUP_ID = val;
      state.productList[idx].DIRTY = true;
      state.requireSaving = true;
    },
    changeCandidateProdHide(state, action) {
      const idx = action.payload.idx;
      const val = action.payload.value;
      state.productList[idx].HIDE = val;
      state.productList[idx].DIRTY = true;
      state.requireSaving = true;
    },
    changeShowAllProduct(state, action) {
      state.showAllProduct = action.payload;
    }
  }
});

// Export actions
export const { updateProductList, addDummyProduct, changeCandidateProdListIdx,
  changeCandidateProdName, changeCandidateProdType, changeCandidateProdGroupID, 
  changeCandidateProdHide, changeShowAllProduct } = productManagerSlice.actions;

// Export reducer
export default productManagerSlice.reducer;
