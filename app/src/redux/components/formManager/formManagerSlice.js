import { createSlice } from "@reduxjs/toolkit";

const formManagerSlice = createSlice({
  name: "formManager",
  initialState: {
    formList: [],
    candidateFormID: 1,
    changeRequests: [],
  },
  reducers: {
    updateFormList(state, action) {
      state.formList = action.payload;
      state.changeRequests = [];
    },
    changeCandidateFormID(state, action) {
      state.candidateFormID = action.payload;
    },
    addChangeRequest(state, action) {
      let CR = action.payload;
      state.changeRequests.push(CR);
      if(state.formList.length < Number(CR.ID)) {
        let formItem = {
          ID: Number(CR.ID),
          NAME: CR.NAME,
          DIRTY: false,
        }
        state.formList.push(formItem);
      }
      state.formList.forEach(function(obj) {
        if(obj.ID == CR.ID) {
          obj.NAME = CR.NAME;
          obj.DIRTY = true;
        }
      });
    },
  }
});

// Export actions
export const { updateFormList, changeCandidateFormID, addChangeRequest } = formManagerSlice.actions;

// Export reducer
export default formManagerSlice.reducer;
