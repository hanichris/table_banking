import secureLocalStorage from "react-secure-storage";

export const getLocalToken = () => secureLocalStorage.getItem('token');

export const setLocalToken = (token: string) => secureLocalStorage.setItem('token', token);

export const removeLocalToken = () => secureLocalStorage.removeItem('token');