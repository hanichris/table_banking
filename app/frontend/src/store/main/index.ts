import { MainState } from "./state";

export const defaultState: MainState = {
  error: null,
  isLoggedIn: null,
  status: 'idle', // or: 'loading' | 'succeeded' | 'failed'
  token: '',
  user: {
    details: {
      email: '',
      is_active: null,
      is_superuser: null,
      full_name: '',
      id: -1,
      banks: [],
      banks_admin: [],
    },
    banks: {}
  }
};