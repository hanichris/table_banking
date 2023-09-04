import { Action, MainState } from "./state";

export default function usersReducer(state: MainState, action: Action) {
  switch (action.type) {
    case 'loggedIn': {
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        token: action.payload.token,
      };
    }

    case 'logInError': {
      return {
        ...state,
        logInError: action.payload.logInError,
      }
    }
    case 'loggedOut': {
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        token: action.payload.token,
      };
    }

    case 'getMe': {
      return {
        ...state,
        userProfile: action.payload.userProfile
      }
    }

    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}