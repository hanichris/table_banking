import { Dispatch, createContext, useReducer } from "react";
import usersReducer from "../store/main/reducer";
import { Action, MainState } from "../store/main/state";
import { ContextProp } from "../interfaces";

const userCtx: MainState = {
  logInError: false,
  isLoggedIn: false,
  token: '',
};

export const UsersContext = createContext<MainState | null>(null);
export const UsersDispatchContext = createContext<Dispatch<Action> | null>(null);

export function UsersProvider({ children }: ContextProp) {
  const [users, dispatch ] = useReducer(usersReducer, userCtx);

  return (
    <UsersContext.Provider value={users}>
      <UsersDispatchContext.Provider value={dispatch}>
        { children }
      </UsersDispatchContext.Provider>
    </UsersContext.Provider>
  );
}