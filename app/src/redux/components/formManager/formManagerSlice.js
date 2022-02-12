import { createSlice } from "@reduxjs/toolkit";

const formManagerSlice = createSlice({
  name: "formManager",
  initialState: {
    formList: [],
    originalList: [],
    candidateFormListIdx: -1,
    requireSaving: false,
  },
  reducers: {
    updateFormList(state, action) {
      state.formList = action.payload;
      state.originalList = action.payload;
      state.candidateFormListIdx = -1;
      state.requireSaving = false;
    },
    addDummyForm(state, action) {
      state.formList = [...state.formList, action.payload];
      state.originalList = [...state.originalList, action.payload];
      state.requireSaving = true;
    },
    changeCandidateFormListIdx(state, action) {
      state.candidateFormListIdx = action.payload;
    },
    changeCandidateFormName(state, action) {
      const idx = action.payload.idx;
      const val = action.payload.value;
      state.formList[idx].NAME = val;
      state.formList[idx].DIRTY = true;
      state.requireSaving = true;
    },
  }
});

// Export actions
export const { updateFormList, addDummyForm, changeCandidateFormListIdx, changeCandidateFormName } = formManagerSlice.actions;

// Export reducer
export default formManagerSlice.reducer;
