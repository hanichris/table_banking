import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../api";
import { IBank, IUserProfile } from "../../interfaces";

type BankThunk = {
  token: string,
  id: number,
};

interface BankDetails extends IBank {
  members: Array<IUserProfile>;
}

export const bankActions = {
  getBank: createAsyncThunk('bank/getId',async ({token, id}: BankThunk) => {
    const resp = await api.getBank(token, id);
    if (!resp.ok) {
      throw new Error("Could not retrieve bank details of the provided ID.");
    }
    const respJson: BankDetails = await resp.json();
    return respJson;
  })
};