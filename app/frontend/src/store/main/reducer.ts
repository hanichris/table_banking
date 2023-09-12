import { createSlice } from "@reduxjs/toolkit";

// import { IUserProfile } from "../../interfaces";
// import { MainState } from "./state";
// import type { RootState } from "../store";

export const mainSlice = createSlice({
  name: 'main',
  initialState: undefined,
  reducers: {
    loggedIn: () => {
      console.log('Not implemented');
    },
    logInError: () => {
      console.log('Not implemented');
    },
    loggedOut: () => {
      console.log('Not implemented');
    },
  }
});

export const { loggedIn, logInError, loggedOut } = mainSlice.actions;
export default mainSlice.reducer;

// export default function usersReducer(state: MainState, action: Action) {
//   switch (action.type) {
//     case 'main/loggedIn': {
//       return {
//         ...state,
//         logInError: action.payload.logInError,
//         isLoggedIn: action.payload.isLoggedIn,
//         token: action.payload.token,
//         userProfile: action.payload.userProfile as IUserProfile,
//       };
//     }

//     case 'main/logInError': {
//       return {
//         ...state,
//         logInError: action.payload.logInError,
//         isLoggedIn: action.payload.isLoggedIn,
//         token: action.payload.token,
//         userProfile: action.payload.userProfile,
//       }
//     }
//     case 'main/loggedOut': {
//       return {
//         ...state,
//         isLoggedIn: action.payload.isLoggedIn,
//         token: action.payload.token,
//       };
//     }

//     case 'main/getMe': {
//       return {
//         ...state,
//         userProfile: action.payload.userProfile
//       }
//     }

//     default:
//       throw new Error(`Unrecognized action: ${action.type}`);
//   }
// }