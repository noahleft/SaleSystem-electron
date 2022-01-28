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
      state.recordList[state.candidateRecordListIdx].COMP_ID = action.payload;
      state.requireSaving = true;
    },
    changeCandidateRecordProdId(state, action) {
      state.recordList[state.candidateRecordListIdx].PROD_ID = action.payload;
      state.requireSaving = true;
    },
    changeCandidateRecordDeliverDate(state, action) {
      state.recordList[state.candidateRecordListIdx].DELIVER_DATE = action.payload;
      state.requireSaving = true;
    },
    changeCandidateRecordUnitPrice(state, action) {
      state.recordList[state.candidateRecordListIdx].UNIT_PRICE = action.payload;
      state.requireSaving = true;
    },
    changeCandidateRecordQuantity(state, action) {
      state.recordList[state.candidateRecordListIdx].QUANTITY = action.payload;
      state.requireSaving = true;
    },
    addChangeRequest(state, action) {
      let CR = action.payload;
      state.changeRequests.push(CR);
    //   if(state.companyList.length < Number(CR.ID)) {
    //     let companyItem = {
    //       ID: Number(CR.ID),
    //       NAME: CR.NAME,
    //       DIRTY: false,
    //     }
    //     state.companyList.push(companyItem);
    //   }
    //   state.companyList.forEach(function(obj) {
    //     if(obj.ID == CR.ID) {
    //       obj.NAME = CR.NAME;
    //       obj.DIRTY = true;
    //     }
    //   });
    },
  }
});

// Export actions
export const { updateRecordList, changeCandidateRecordListIdx, changeCandidateRecordCompId,
  changeCandidateRecordProdId, changeCandidateRecordDeliverDate, changeCandidateRecordUnitPrice, 
  changeCandidateRecordQuantity, addChangeRequest, addDummyRecord } = recordManagerSlice.actions;

// Export reducer
export default recordManagerSlice.reducer;
