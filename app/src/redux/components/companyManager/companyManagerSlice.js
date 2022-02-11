import { createSlice } from "@reduxjs/toolkit";

const companyManagerSlice = createSlice({
  name: "companyManager",
  initialState: {
    companyList: [],
    originalList: [],
    candidateCompListIdx: -1,
    changeRequests: [],
  },
  reducers: {
    updateCompanyList(state, action) {
      state.companyList = action.payload;
      state.originalList = action.payload;
      state.candidateCompListIdx = -1;
      state.changeRequests = [];
    },
    changeCandidateCompListIdx(state, action) {
      state.candidateCompListIdx = action.payload;
    },
    addChangeRequest(state, action) {
      let CR = action.payload;
      state.changeRequests.push(CR);
      if(state.companyList.length < Number(CR.ID)) {
        let companyItem = {
          ID: Number(CR.ID),
          NAME: CR.NAME,
          DIRTY: false,
        }
        state.companyList.push(companyItem);
      }
      state.companyList.forEach(function(obj) {
        if(obj.ID == CR.ID) {
          obj.NAME = CR.NAME;
          obj.DIRTY = true;
        }
      });
    },
  }
});

// Export actions
export const { updateCompanyList, changeCandidateCompListIdx, addChangeRequest } = companyManagerSlice.actions;

// Export reducer
export default companyManagerSlice.reducer;
