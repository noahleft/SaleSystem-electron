import { createSlice } from "@reduxjs/toolkit";

const recordManagerSlice = createSlice({
  name: "recordManager",
  initialState: {
    recordList: [],
    candidateRecordListIdx: 0,
    changeRequests: [],
  },
  reducers: {
    updateRecordList(state, action) {
      state.recordList = action.payload;
      state.changeRequests = [];
    },
    changeCandidateRecordListIdx(state, action) {
      const idx = action.payload;
      state.candidateRecordListIdx = idx;
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
export const { updateRecordList, changeCandidateRecordListIdx, addChangeRequest } = recordManagerSlice.actions;

// Export reducer
export default recordManagerSlice.reducer;
