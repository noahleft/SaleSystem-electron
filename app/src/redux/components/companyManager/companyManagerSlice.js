import { createSlice } from "@reduxjs/toolkit";

const companyManagerSlice = createSlice({
  name: "companyManager",
  initialState: {
    candidateCompID: 1,
  },
  reducers: {
    changeCandidateCompID(state, action) {
      state.candidateCompID = action.payload;
    },
  }
});

// Export actions
export const { changeCandidateCompID } = companyManagerSlice.actions;

// Export reducer
export default companyManagerSlice.reducer;
