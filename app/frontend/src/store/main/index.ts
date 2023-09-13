import { MainState } from "./state";

export const defaultState: MainState = {
  error: undefined,
  isLoggedIn: null,
  status: 'idle', // or: 'loggedIn', 'logInError', 'signUpError', 'loggedOut'
  token: '',
  userProfile: null,
};