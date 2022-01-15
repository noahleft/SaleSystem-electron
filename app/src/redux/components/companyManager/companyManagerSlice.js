import { createSlice } from "@reduxjs/toolkit";

const companyManagerSlice = createSlice({
  name: "companyManager",
  initialState: {
    companyList: [],
    candidateCompID: 1,
    changeRequests: [],
  },
  reducers: {
    updateCompanyList(state, action) {
      state.companyList = action.payload;
    },
    changeCandidateCompID(state, action) {
      state.candidateCompID = action.payload;
    },
    addChangeRequest(state, action) {
      state.changeRequests.push(action.payload);
    },
  }
});

// Export actions
export const { updateCompanyList, changeCandidateCompID, addChangeRequest } = companyManagerSlice.actions;

// Export reducer
export default companyManagerSlice.reducer;
