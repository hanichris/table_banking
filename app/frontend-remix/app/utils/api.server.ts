const apiEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

function authHeader(token:string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const api = {
  getAccessToken: async (username: string, password: string) => {
    const params = new URLSearchParams();
    params.set("username", username);
    params.set("password", password);

    return fetch(`${apiEndpoint}/login/access-token`,{
      method: "POST",
      body: params,
    });
  },
};