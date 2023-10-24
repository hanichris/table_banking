import { IBankCreate, IParams, IUserProfileCreate } from "./interfaces";

const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

function authHeader(token:string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const api = {
  loginGetToken: async (username:string, password:string) => {
    const data = new URLSearchParams();
    data.set('username',username);
    data.set('password', password);

    return fetch(`${serverEndpoint}/login/access-token`, {
      method: 'POST',
      body: data,
    });
  },
  getMe:async (token:string) => {
    return fetch(`${serverEndpoint}/users/me`, authHeader(token));
  },
  getUsers:async (token:string, signal: AbortSignal, params: IParams) => {
    const skip = params.pageSize * (params.pageNum - 1);
    const limit = params.pageSize;
    return fetch(`${serverEndpoint}/users/?skip=${skip}&limit=${limit}`,{
      signal,
      headers: authHeader(token).headers,
    }).then((res) => res.json());
  },
  createUser:async (token:string, data: IUserProfileCreate) => {
    const header: Record<string, Record<string, string>> = structuredClone(authHeader(token));
    header.headers['Content-Type'] = 'application/json;charset=utf-8';
    return fetch(`${serverEndpoint}/users/`,{
      method: 'POST',
      headers: header.headers,
      body: JSON.stringify(data),
    });
  },
  getBank:async (token:string, bankId: number) => {
    return fetch(`${serverEndpoint}/banks/${bankId}`, authHeader(token));
  },
  getBanks:async (token:string) => {
    return fetch(`${serverEndpoint}/banks`, authHeader(token));
  },
  createBank: async (token:string, data: IBankCreate) => {
    const header: Record<string, Record<string, string>> = structuredClone(authHeader(token));
    header.headers['Content-Type'] = 'application/json;charset=utf-8';
    return fetch(`${serverEndpoint}/banks/`, {
      method: 'POST',
      headers: header.headers,
      body: JSON.stringify(data)
    });
  }
};