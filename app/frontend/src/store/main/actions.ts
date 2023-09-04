import { api } from "../../api";
import { IToken } from "../../interfaces";
import { removeLocalToken, setLocalToken } from "../../utils";

export const actions = {
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
        return {
          type: 'loggedIn',
          payload: {
            logInError: false,
            isLoggedIn: true,
            token: token,
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
        token: ''
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