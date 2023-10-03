import { createSlice } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";

import { defaultState } from ".";
import { actions } from "./actions";

const bank = new schema.Entity('bank');
const user = new schema.Entity('user', {
  banks: [bank],
  banks_admin: [bank],
})


export const mainSlice = createSlice({
  name: 'main',
  initialState: defaultState,
  reducers: {
    loggedOut: () => {
      return defaultState;
    },
    getMe: (state, action) => {
      const {userProfile, token} = action.payload;
      const normalizedUserProfile = normalize(userProfile, user);
      state.entities = structuredClone(normalizedUserProfile.entities);
      state.isLoggedIn = true;
      state.token = token;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(actions.logIn.pending, state => {
        state.status = 'loading';
      })
      .addCase(actions.logIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const {userProfile, ...rest} = action.payload;
        const normalizedUserProfile = normalize(userProfile, user);
        state.entities = structuredClone(normalizedUserProfile.entities);
        Object.assign(state, rest);
        state.error = null;
      })
      .addCase(actions.logIn.rejected, (state, action) => {
        Object.assign(state, defaultState);
        state.status = 'failed';
        state.error = action.error.message as string;
      })
  },
});

export const { loggedOut, getMe } = mainSlice.actions;
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