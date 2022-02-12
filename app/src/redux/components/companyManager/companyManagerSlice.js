import { createSlice } from "@reduxjs/toolkit";

const companyManagerSlice = createSlice({
  name: "companyManager",
  initialState: {
    companyList: [],
    originalList: [],
    candidateCompListIdx: -1,
    requireSaving: false,
  },
  reducers: {
    updateCompanyList(state, action) {
      state.companyList = action.payload;
      state.originalList = action.payload;
      state.candidateCompListIdx = -1;
      state.requireSaving = false;
    },
    addDummyCompany(state, action) {
      state.companyList = [...state.companyList, action.payload];
      state.originalList = [...state.originalList, action.payload];
      state.requireSaving = true;
    },
    changeCandidateCompListIdx(state, action) {
      state.candidateCompListIdx = action.payload;
    },
    changeCandidateCompName(state, action) {
      const idx = action.payload.idx;
      const val = action.payload.value;
      state.companyList[idx].NAME = val;
      state.companyList[idx].DIRTY = true;
      state.requireSaving = true;
    },
    changeCandidateCompBusNum(state, action) {
      const idx = action.payload.idx;
      const val = action.payload.value;
      state.companyList[idx].BUSINESSNUM = val;
      state.companyList[idx].DIRTY = true;
      state.requireSaving = true;
    },
    changeCandidateCompPhone(state, action) {
      const idx = action.payload.idx;
      const val = action.payload.value;
      state.companyList[idx].PHONE = val;
      state.companyList[idx].DIRTY = true;
      state.requireSaving = true;
    },
    changeCandidateCompContact(state, action) {
      const idx = action.payload.idx;
      const val = action.payload.value;
      state.companyList[idx].CONTACT = val;
      state.companyList[idx].DIRTY = true;
      state.requireSaving = true;
    }
  }
});

// Export actions
export const { updateCompanyList, addDummyCompany, changeCandidateCompListIdx, 
  changeCandidateCompName, changeCandidateCompBusNum, changeCandidateCompPhone,
  changeCandidateCompContact } = companyManagerSlice.actions;

// Export reducer
export default companyManagerSlice.reducer;
