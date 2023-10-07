import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../api";
import { IToken, IUser } from "../../interfaces";
import { setLocalToken } from "../../utils";


type LogInResponse = {
  token: string,
  isLoggedIn: boolean,
  userProfile: IUser | null,
}


export const actions = {
  getMe:createAsyncThunk('main/getMe', async (token:string) => {
    const resp = await api.getMe(token);
    if (!resp.ok) {
      throw new Error("Could not retrieve user profile");
    }
    const respJson = await resp.json();
    const userProfile = <IUser>respJson;
    return {userProfile, token};
  }),
  logIn: createAsyncThunk('main/logIn',async (payload:{uname: string, pwd: string}) => {
    const result: LogInResponse = {token: '', isLoggedIn: false, userProfile: null};
    const resp = await api.loginGetToken(payload.uname, payload.pwd);
    if (!resp.ok) {
      throw new Error("Network response was not OK!!!");
    }
    const respJson: IToken = await resp.json();
    const token = respJson.access_token;
    if (token) {
      setLocalToken(token);
      const r = await api.getMe(token);
      result.userProfile = await r.json();
      result.isLoggedIn = true;
      result.token = token;
    }
    return result;
  }),
};

// export const actions = {
//   actionGetUserProfile:async (token:string) => {
//     let respJson: IUserProfile | undefined = undefined;
//     const resp = await api.getMe(token);
//     if (!resp.ok) {
//       throw new Error("Network response was not OK!!!");
//     }
//     respJson = await resp.json();
//     return respJson;
//   },
//   actionLogIn:async (payload:{username: string, password:string}) => {
//     let respJson: IToken;
//     try {
//       const resp = await api.loginGetToken(payload.username, payload.password);
//       if (!resp.ok) {
//         throw new Error("Network response was not OK");
//       }
//       respJson = await resp.json();
//       const token = respJson.access_token;
//       if (token) {
//         setLocalToken(token);
//         const userProfile = await actions.actionGetUserProfile(token);
//         return {
//           type: 'main/loggedIn',
//           payload: {
//             logInError: false,
//             isLoggedIn: true,
//             token,
//             userProfile,
//           }
//         };
//       }
//     } catch (err) {
//       if (err instanceof Error) {
//         console.error(err.message);
//       } else {
//         console.error(`Unexpected error: ${err}`);
//       }
//       }
//     return {
//       type: 'main/logInError',
//       payload: {
//         logInError: true,
//         isLoggedIn: false,
//         token: '',
//         userProfile: undefined,
//       }
//     }
//   },
//   actionLogOut:async () => {
//     removeLocalToken();
//     return {
//       type: 'main/loggedOut',
//       payload: {
//         isLoggedIn: false,
//         token: '',
//       }
//     };
//   },
// };