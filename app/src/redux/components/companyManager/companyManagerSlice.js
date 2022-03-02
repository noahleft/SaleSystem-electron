import { createSlice } from "@reduxjs/toolkit";

const companyManagerSlice = createSlice({
  name: "companyManager",
  initialState: {
    companyList: [],
    originalList: [],
    candidateCompListIdx: -1,
    requireSaving: false,
    showAllCompany: true,
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
    },
    changeCandidateCompTax(state, action) {
      const idx = action.payload.idx;
      const val = action.payload.value;
      state.companyList[idx].PRINTTAX = val;
      state.companyList[idx].DIRTY = true;
      state.requireSaving = true;
    },
    changeCandidateCompHide(state, action) {
      const idx = action.payload.idx;
      const val = action.payload.value;
      state.companyList[idx].HIDE = val;
      state.companyList[idx].DIRTY = true;
      state.requireSaving = true;
    },
    changeCandidateCompNote(state, action) {
      const idx = action.payload.idx;
      const val = action.payload.value;
      state.companyList[idx].NOTE = val;
      state.companyList[idx].DIRTY = true;
      state.requireSaving = true;
    },
    changeCandidateCompAddress(state, action) {
      const idx = action.payload.idx;
      const val = action.payload.value;
      state.companyList[idx].ADDRESS = val;
      state.companyList[idx].DIRTY = true;
      state.requireSaving = true;
    },
    changeShowAllCompany(state, action) {
      state.showAllCompany = action.payload;
    }
  }
});

// Export actions
export const { updateCompanyList, addDummyCompany, changeCandidateCompListIdx, 
  changeCandidateCompName, changeCandidateCompBusNum, changeCandidateCompPhone,
  changeCandidateCompContact, changeCandidateCompTax, changeCandidateCompHide,
  changeCandidateCompNote, changeCandidateCompAddress, changeShowAllCompany } = companyManagerSlice.actions;

// Export reducer
export default companyManagerSlice.reducer;
