import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {}
});

// Infer the `RootState` and `AppDispatch` from the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch