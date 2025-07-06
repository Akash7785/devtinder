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
    removeRequest: (state, action) => {
      const newReq = state.filter((user) => user._id !== action.payload);
      return newReq;
    },
  },
});

export const { addRequestData, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
