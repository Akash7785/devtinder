import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice";
import connectionReducer from "../features/connectionSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    connection: connectionReducer,
  },
});
