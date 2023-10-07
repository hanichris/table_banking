import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "..";

export const selectMain = (state: RootState) => state.main;
export const selectUserBankById = (state: RootState, bankId: string) => {
  return state.main.user.banks[bankId];
};

export const selectUserToken = (state: RootState) => state.main.token;

export const selectAllUserBanks = (state: RootState)=> {
  return state.main.user.banks;
};

export const selectAllUserBankIds = createSelector(
  [selectAllUserBanks],
  (banks) => Object.keys(banks)
);

