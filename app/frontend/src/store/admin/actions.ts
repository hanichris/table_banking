import { api } from "../../api";
import { MainState } from "../main/state";

export const actions = {
  actionCreateUser: '',
  actionGetUsers:async (context: MainState) => {
    try {
      const resp = await api.getUsers(context.token);
      if (!resp.ok) {
        throw new Error("Network response was not OK!!!");
      }
      
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(`Unexpected error: ${err}`);
      }
    }
    return {};
  },
  actionUpdateUser: '',
};