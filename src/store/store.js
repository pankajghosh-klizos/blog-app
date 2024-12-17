import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./auth.slice.js";

const store = configureStore({
  reducer: {
    auth: authReducers,
  },
});

export default store;
