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
    loggedOut: (state) => {
      state.isLoggedIn = false;
      state.token = '';
      state.userProfile = null;
      state.status = 'idle';
      state.error = undefined;
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
        state.token = action.payload.token;
        state.isLoggedIn = action.payload.isLoggedIn;
        state.userProfile = action.payload.userProfile
      })
      .addCase(actions.logIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
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