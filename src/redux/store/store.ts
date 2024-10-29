// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"; // Check your import path

const store = configureStore({
  reducer: {
    auth: authReducer,
    // add other reducers if necessary
  },
  // middleware should be configured automatically by Redux Toolkit
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
