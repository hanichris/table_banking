import { MainState } from "./state";

export const defaultState: MainState = {
  error: null,
  isLoggedIn: null,
  status: 'idle', // or: 'loading' | 'succeeded' | 'failed'
  token: '',
  entities: {},
};