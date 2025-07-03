import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: {
    connection: null,
  },
  reducers: {
    addConnections: (state, action) => {
      state.connection = action.payload;
    },
    removeConnections: (state, action) => {},
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
