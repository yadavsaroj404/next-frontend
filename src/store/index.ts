import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./layoutSlice";

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    // add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
