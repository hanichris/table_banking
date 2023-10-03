import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../api";
// import { MainState } from "../main/state";

export const actions = {
  createUser: '',
  getUsers: createAsyncThunk('admin/getUsers',async (token: string) => {
    const resp = await api.getUsers(token);
    if (!resp.ok) {
      throw new Error("Network response was not OK!!!");
    }
  }),
  updateUser: '',
  deleteUser: '',
};