import { createSlice } from "@reduxjs/toolkit";

const companyManagerSlice = createSlice({
  name: "companyManager",
  initialState: {
    candidateCompID: 1,
    changeRequests: [],
  },
  reducers: {
    changeCandidateCompID(state, action) {
      state.candidateCompID = action.payload;
    },
    addChangeRequest(state, action) {
      state.changeRequests.push(action.payload);
    },
  }
});

// Export actions
export const { changeCandidateCompID , addChangeRequest } = companyManagerSlice.actions;

// Export reducer
export default companyManagerSlice.reducer;
