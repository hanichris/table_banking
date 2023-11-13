import { IBankCreate, IBankUpdate, IParams, IUserProfileCreate, IUserProfileUpdate } from "./interfaces";

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
  getUser:async (token:string, signal: AbortSignal, userID:string) => {
    return fetch(`${serverEndpoint}/users/${userID}`, {
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
  deleteUser:async (token:string, userID: string) => {
    return fetch(`${serverEndpoint}/users/${userID}`, {
      method: 'DELETE',
      headers: authHeader(token).headers,
    });
  },
  updateUser:async (token:string, userID: string, data: IUserProfileUpdate) => {
    const header: Record<string, Record<string, string>> = structuredClone(authHeader(token));
    header.headers['Content-Type'] = 'application/json;charset=utf-8';
    return fetch(`${serverEndpoint}/users/${userID}`, {
      method: 'PATCH',
      headers: header.headers,
      body: JSON.stringify(data),
    });
  },
  getBank:async (token:string, bankId: string, signal: AbortSignal) => {
    return fetch(`${serverEndpoint}/banks/${bankId}`, {
      signal,
      headers: authHeader(token).headers,
    }).then((res) => res.json());
  },
  getBanks:async (token:string, signal: AbortSignal, params: IParams) => {
    const skip = params.pageSize * (params.pageNum - 1);
    const limit = params.pageSize;
    return fetch(`${serverEndpoint}/banks/?skip=${skip}&limit=${limit}`, {
      signal,
      headers: authHeader(token).headers,
    }).then((res) => res.json());
  },
  createBank: async (token:string, data: IBankCreate) => {
    const header: Record<string, Record<string, string>> = structuredClone(authHeader(token));
    header.headers['Content-Type'] = 'application/json;charset=utf-8';
    return fetch(`${serverEndpoint}/banks/`, {
      method: 'POST',
      headers: header.headers,
      body: JSON.stringify(data)
    });
  },
  updateBank:async (token:string, bankID: string, data: IBankUpdate) => {
    const header: Record<string, Record<string, string>> = structuredClone(authHeader(token));
    header.headers['Content-Type'] = 'application/json;charset=utf-8';
    return fetch(`${serverEndpoint}/banks/${bankID}`, {
      method: 'PATCH',
      headers: header.headers,
      body: JSON.stringify(data),
    });
  },
  removeUser:async (token:string, bankID:string, userID: string) => {
    return fetch(`${serverEndpoint}/banks/${bankID}/users/${userID}?r=True`, authHeader(token));
  },
  addUser:async (token:string, bankID: string, userID: string) => {
    return fetch(`${serverEndpoint}/banks/${bankID}/users/${userID}`, authHeader(token));
  }
};