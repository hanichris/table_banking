import { api } from "../../api";
import { IUserProfile } from "../../interfaces";

const secretCache: {[key: number]: string} = {};

onmessage = async (e: MessageEvent<string | number>) => {
  if (typeof e.data === "string") {
    try {
      const token = e.data;
      const resp = await api.getMe(token)
      if (!resp.ok) {
        throw new Error("The network response was not OK!!!");
      }
      const json: IUserProfile = await resp.json();
      secretCache[json.id] = token;
      postMessage({json, token});
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(`Unexpected error: ${err}`);
      }
    }
  } else {
    postMessage(secretCache[e.data])
  }
}