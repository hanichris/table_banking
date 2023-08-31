export const getLocalToken = () => localStorage.getItem('token');

export const setLocalToken = (token: string) => localStorage.setItem('token', token);

export const removeLocalToken = () => localStorage.removeItem('token');