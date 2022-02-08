import { createSlice } from "@reduxjs/toolkit";

const companyManagerSlice = createSlice({
  name: "companyManager",
  initialState: {
    companyList: [],
    originalList: [],
    candidateCompID: 1,
    changeRequests: [],
  },
  reducers: {
    updateCompanyList(state, action) {
      state.companyList = action.payload;
      state.originalList = action.payload;
      state.changeRequests = [];
    },
    changeCandidateCompID(state, action) {
      state.candidateCompID = action.payload;
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
export const { updateCompanyList, changeCandidateCompID, addChangeRequest } = companyManagerSlice.actions;

// Export reducer
export default companyManagerSlice.reducer;
