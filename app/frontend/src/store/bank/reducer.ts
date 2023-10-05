import { createSlice } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";

import { bankDefaultState as defaultState } from ".";
import { bankActions } from "./actions";

const userEntity = new schema.Entity('user');
const bankEntity = new schema.Entity('bank', {members: [userEntity]});

export const bankSlice = createSlice({
  name: 'bank',
  initialState: defaultState,
  reducers: {},
  extraReducers(builder){
    builder
      .addCase(bankActions.getBank.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(bankActions.getBank.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const normalizedBank = normalize(action.payload, bankEntity);
        const { bank, user} = normalizedBank.entities;
        if (bank) {
          const { members, ...rest} = bank[action.payload.id];
          Object.assign(state, rest);
          state.members.ids = members.slice();
        }
        Object.assign(state.members.entities, user);
      })
      .addCase(bankActions.getBank.rejected, (state, action) => {
        Object.assign(state, defaultState);
        state.status = 'failed';
        state.error = action.error.message as string;
      })
  }
});

export default bankSlice.reducer;