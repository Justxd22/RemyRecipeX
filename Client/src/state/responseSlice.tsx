import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe, ResponseState } from "../lib/types";

const initialState: ResponseState = {
  geminiResponse: null, // Initial value is null until a response is received
  error: "",
};

const registerSlice = createSlice({
  name: "geminiResponse",
  initialState,
  reducers: {
    // Update the PayloadAction type to accept a Recipe object
    setResponse: (state, action: PayloadAction<Recipe>) => {
      state.geminiResponse = action.payload;
    //   console.log('from slice', action.payload)
    },
    setResError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setResponse, setResError } = registerSlice.actions;

export default registerSlice.reducer;
