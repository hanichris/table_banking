import { redirect } from 'react-router-dom';
import { store } from '../store';
import { selectMain, selectAllUserBanks } from '../store/main/selectors';
import { getLocalToken, removeLocalToken } from '../utils';
import { actions } from '../store/main/actions';


export async function layoutLoader() {
  console.log('running root loader');
  const token = getLocalToken() as string | null;
  const user = selectMain(store.getState());
  if (token && token !== user.token) {
    console.table({token: token, 'store token': user.token});
    try {
      await store.dispatch(actions.getMe(token));
      return selectMain(store.getState());
    } catch (error) {
      console.error(error);
      removeLocalToken();
      return null;
    }
  }
  return null;
}

export async function dashboardLoader() {
  console.log('running dashboard loader');
  const user = selectMain(store.getState());
  if (user.isLoggedIn === null) {
    console.log('The user is not logged in');
    throw redirect('/');
  }
  console.log('The user is logged in.')
  return user;
}

export async function bankListLoader({ request }: {request: Request}) {
  console.log('running banklist loader');
  const userBanks = selectAllUserBanks(store.getState());
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  if (q) {
    const banks = Object
    .values(userBanks)
      .filter(bank => bank.title.toLocaleLowerCase().includes(q.toLocaleLowerCase()));
    return { banks, q};
  }
  const banks = Object.keys(userBanks);
  return { banks, q: null };
}