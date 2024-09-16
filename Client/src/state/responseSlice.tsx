import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieData, Recipe, ResponseState } from "../lib/types";

const initialState: ResponseState = {
  geminiResponse: null, // Initial value is null until a response is received
  movieResponse: null, // Initial value is null until a response is received
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
    setMovie:(state, action: PayloadAction<MovieData>) => {
      state.movieResponse = action.payload;
    //   console.log('from slice', action.payload)
    },
  },
});

export const { setResponse, setResError, setMovie } = registerSlice.actions;

export default registerSlice.reducer;
