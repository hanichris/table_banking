import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from ".";

const adminSlice = createSlice({
  name: 'admin',
  initialState: defaultState,
  reducers: {},
});

export default adminSlice.reducer;