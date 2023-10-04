import { redirect } from 'react-router-dom';
import { store } from '../store';
import { selectMain } from '../store/main/selectors';
import { getLocalToken, removeLocalToken } from '../utils';
import { actions } from '../store/main/actions';
import { getMe } from '../store/main/reducer';


export async function dashboardLoader() {
  const user = selectMain(store.getState());
  if (user.isLoggedIn === null) {
    throw redirect('/');
  }
  return user;
}

export async function layoutLoader() {
  const token = getLocalToken() as string | null;
  if (token) {
    console.log(token);
    try {
      const userProfile = await actions.getMe(token);
      store.dispatch(getMe({userProfile, token}));
      return selectMain(store.getState());
    } catch (error) {
      removeLocalToken();
      return null;
    }
  }
  return null;
}