import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from ".";
import { actions } from "./actions";

// import { IUserProfile } from "../../interfaces";
// import { MainState } from "./state";
// import type { RootState } from "../store";

export const mainSlice = createSlice({
  name: 'main',
  initialState: defaultState,
  reducers: {
    loggedOut: () => {
      return defaultState;
    },
    loaded: () => {},
  },
  extraReducers(builder) {
    builder
      .addCase(actions.logIn.pending, state => {
        state.status = 'loading';
      })
      .addCase(actions.logIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
        state.error = null;
      })
      .addCase(actions.logIn.rejected, (state, action) => {
        Object.assign(state, defaultState);
        state.status = 'failed';
        state.error = action.error.message as string;
      })
  },
});

export const { loggedOut } = mainSlice.actions;
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