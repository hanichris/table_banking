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
  getUsers:async (token:string) => {
    return fetch(`${serverEndpoint}/users/`, authHeader(token));
  }
};