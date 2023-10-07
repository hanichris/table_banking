import { createSlice } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";

import { defaultState } from ".";
import { actions } from "./actions";

const bankEntity = new schema.Entity('bank');
const userEntity = new schema.Entity('user', {
  banks: [bankEntity],
  banks_admin: [bankEntity],
})


export const mainSlice = createSlice({
  name: 'main',
  initialState: defaultState,
  reducers: {
    loggedOut: () => {
      return defaultState;
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
        Object.assign(state, rest);
        const normalizedUserProfile = normalize(userProfile, userEntity);
        const {bank, user} = normalizedUserProfile.entities;
        if (user && userProfile) {
          state.user.details = structuredClone(user[userProfile.id])
          state.user.banks = Object.assign({}, bank);
        }
        state.error = null;
      })
      .addCase(actions.logIn.rejected, (state, action) => {
        Object.assign(state, defaultState);
        state.status = 'failed';
        state.error = action.error.message as string;
      })
      .addCase(actions.getMe.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const {userProfile, token} = action.payload;
        state.token = token;
        state.isLoggedIn = true;
        const normalizedUserProfile = normalize(userProfile, userEntity);
        const {bank, user} = normalizedUserProfile.entities;
        if (user) {
          state.user.details = structuredClone(user[userProfile.id]);
          state.user.banks = Object.assign({}, bank);
        }
        state.error = null;
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