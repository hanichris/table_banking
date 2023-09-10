import { api } from "../../api";
import { IToken, IUserProfile } from "../../interfaces";
import { removeLocalToken, setLocalToken } from "../../utils";

export const actions = {
  actionGetUserProfile:async (token:string) => {
    let respJson: IUserProfile | undefined = undefined;
    const resp = await api.getMe(token);
    if (!resp.ok) {
      throw new Error("Network response was not OK!!!");
    }
    respJson = await resp.json();
    return respJson;
  },
  actionLogIn:async (payload:{username: string, password:string}) => {
    let respJson: IToken;
    try {
      const resp = await api.loginGetToken(payload.username, payload.password);
      if (!resp.ok) {
        throw new Error("Network response was not OK");
      }
      respJson = await resp.json();
      const token = respJson.access_token;
      if (token) {
        setLocalToken(token);
        const userProfile = await actions.actionGetUserProfile(token);
        return {
          type: 'loggedIn',
          payload: {
            logInError: false,
            isLoggedIn: true,
            token,
            userProfile,
          }
        };
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(`Unexpected error: ${err}`);
      }
      }
    return {
      type: 'logInError',
      payload: {
        logInError: true,
        isLoggedIn: false,
        token: '',
        userProfile: undefined,
      }
    }
  },
  actionLogOut:async () => {
    removeLocalToken();
    return {
      type: 'loggedOut',
      payload: {
        isLoggedIn: false,
        token: '',
      }
    };
  },
};