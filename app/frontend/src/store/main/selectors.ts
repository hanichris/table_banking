import { RootState } from "..";

export const selectMain = (state: RootState) => state.main;
export const selectUserBankById = (state: RootState, bankId: string) => {
  return state.main.entities.bank[bankId];
};

export const selectAllUserBankIds = (state: RootState)=> {
  return Object.keys(state.main.entities.bank);
};

