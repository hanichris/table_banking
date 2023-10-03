import { redirect } from 'react-router-dom';
import { store } from '../store';
import { SelectMain } from '../store/main/selectors';
import { getLocalToken, removeLocalToken } from '../utils';
import { actions } from '../store/main/actions';
import { getMe } from '../store/main/reducer';


export async function dashboardLoader() {
  const user = SelectMain(store.getState());
  if (user.isLoggedIn === null) {
    throw redirect('/');
  }
  return user;
}

export async function layoutLoader() {
  const token = getLocalToken() as string | null;
  if (token) {
    try {
      const userProfile = await actions.getMe(token);
      store.dispatch(getMe({userProfile, token}));
      return SelectMain(store.getState());
    } catch (error) {
      removeLocalToken();
      return null;
    }
  }
  return null;
}