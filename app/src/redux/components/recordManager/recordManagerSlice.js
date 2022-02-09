import { createSlice } from "@reduxjs/toolkit";

const recordManagerSlice = createSlice({
  name: "recordManager",
  initialState: {
    recordList: [],
    originalList: [],
    candidateRecordListIdx: -1,
    requireSaving: false,
  },
  reducers: {
    updateRecordList(state, action) {
      state.recordList = action.payload;
      state.originalList = action.payload;
      state.candidateRecordListIdx = -1;
      state.requireSaving = false;
    },
    addDummyRecord(state, action) {
      state.recordList = [...state.recordList, action.payload];
      state.originalList = [...state.originalList, action.payload];
      state.requireSaving = true;
    },
    changeCandidateRecordListIdx(state, action) {
      state.candidateRecordListIdx = action.payload;
    },
    changeCandidateRecordCompId(state, action) {
      const idx = action.payload.idx;
      const val = action.payload.value;
      state.recordList[idx].COMP_ID = val;
      state.recordList[idx].DIRTY = true;
      state.requireSaving = true;
    },
    changeCandidateRecordProdId(state, action) {
      state.recordList[state.candidateRecordListIdx].PROD_ID = action.payload;
      state.recordList[state.candidateRecordListIdx].DIRTY = true;
      state.requireSaving = true;
    },
    changeCandidateRecordDeliverDate(state, action) {
      state.recordList[state.candidateRecordListIdx].DELIVER_DATE = action.payload;
      state.recordList[state.candidateRecordListIdx].DIRTY = true;
      state.requireSaving = true;
    },
    changeCandidateRecordUnitPrice(state, action) {
      state.recordList[state.candidateRecordListIdx].UNIT_PRICE = action.payload;
      state.recordList[state.candidateRecordListIdx].DIRTY = true;
      state.requireSaving = true;
    },
    changeCandidateRecordQuantity(state, action) {
      state.recordList[state.candidateRecordListIdx].QUANTITY = action.payload;
      state.recordList[state.candidateRecordListIdx].DIRTY = true;
      state.requireSaving = true;
    },
  }
});

// Export actions
export const { updateRecordList, changeCandidateRecordListIdx, changeCandidateRecordCompId,
  changeCandidateRecordProdId, changeCandidateRecordDeliverDate, changeCandidateRecordUnitPrice, 
  changeCandidateRecordQuantity, addDummyRecord } = recordManagerSlice.actions;

// Export reducer
export default recordManagerSlice.reducer;
