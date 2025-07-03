import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: {
    request: null,
  },
  reducers: {
    addRequestData: (state, action) => {
      state.request = action.payload;
    },
    removeRequestData: (Sate, action) => {},
  },
});

export const { addRequestData, removeRequestData } = requestSlice.actions;

export default requestSlice.reducer;
