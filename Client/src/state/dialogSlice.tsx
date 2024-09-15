import { createSlice } from "@reduxjs/toolkit";

type DialogState = {
  responseDialog: boolean;
  errorDialog: boolean;
};

const initialState: DialogState = {
  responseDialog: false,
  errorDialog: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openResponseDialog: (state) => {
      state.responseDialog = true;
    },
    closeResponseDialog: (state) => {
      state.responseDialog = false;
    },
    openErrorDialog: (state) => {
      state.errorDialog = true;
    },
    closeErrorDialog: (state) => {
      state.errorDialog = false;
    },
  },
});

export const {
  openResponseDialog,
  closeResponseDialog,
  openErrorDialog,
  closeErrorDialog,
} = dialogSlice.actions;

export default dialogSlice.reducer;
