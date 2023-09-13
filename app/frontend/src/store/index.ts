import { configureStore } from "@reduxjs/toolkit";

import mainReducer from './main/reducer';
import adminReducer from './admin/reducer';
import bankReducer from './bank/reducer';


export const store = configureStore({
  reducer: {
    admin: adminReducer,
    main: mainReducer,
    bank: bankReducer,
  }
});

// Infer the `RootState` and `AppDispatch` from the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch