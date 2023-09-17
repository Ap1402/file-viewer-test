import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "./filesReducer";

export const store = configureStore({
  reducer: {
    files: filesReducer
  }
});
