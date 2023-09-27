import { redirect } from 'react-router-dom';
import { store } from '../store';
import { SelectMain } from '../store/main/selectors';


export async function dashboardLoader() {
  const user = SelectMain(store.getState());
  if (user.isLoggedIn === null) {
    throw redirect('/');
  }
  return user;
}