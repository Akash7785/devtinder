import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: null,
  },
  reducers: {
    addFeedData: (state, action) => {
      state.feed = action.payload;
    },
    removeFeedData: (state, action) => {},
  },
});

export const { addFeedData, removeFeedData } = feedSlice.actions;

export default feedSlice.reducer;
