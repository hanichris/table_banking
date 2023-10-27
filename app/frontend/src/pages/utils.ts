import { defer, redirect } from 'react-router-dom';
import { store } from '../store';
import { selectMain, selectAllUserBanks } from '../store/main/selectors';
import { getLocalToken, removeLocalToken } from '../utils';
import { actions } from '../store/main/actions';
import { api } from '../api';


export async function layoutLoader() {
  console.log('running root loader');
  const token = getLocalToken() as string | null;
  const user = selectMain(store.getState());
  if (token) {
    if (user.isLoggedIn === true) {
      console.log('The user is already logged in!!!');
      return user.user.details.is_superuser === true ? redirect('admin') : redirect('dashboard');

    }
    try {
      console.log('Token found. Obtaining user details...');
      const payload = await store.dispatch(actions.getMe(token)).unwrap();
      console.log(`Is Admin: ${payload.userProfile.is_superuser}`);
      return payload.userProfile.is_superuser === true ? redirect('admin') : redirect('dashboard');
    } catch (error) {
      console.log('An error occurred when trying to fetch user details with given token.');
      console.error(error);
      removeLocalToken();
    }
  }
  console.log('No token found in local storage');
  return null;
}

export async function dashboardLoader() {
  console.log('running dashboard loader');
  const user = selectMain(store.getState());
  if (user.isLoggedIn === null) {
    console.log('The user is not logged in. Cannot access dashboard. Redirecting to homepage...');
    return redirect('/');
  }
  console.log('User is already logged in. View the dashboard.');
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

export async function usersLoader({ request }:{request: Request}) {
  const params = {
    pageNum: 1,
    pageSize: 100
  };
  const token = selectMain(store.getState()).token;
  const url = new URL(request.url);
  const userID = url.searchParams.get('id');
  if (userID) {
    return {
      data: api.getUser(token, request.signal, userID),
      userID
    };
  }
  console.log('Not searching for a particular ID. Get all the users.');
  const pageNum = url.searchParams.get('pageNum');
  const pageSize = url.searchParams.get('limit');
  if (pageNum) {
    params.pageNum = +pageNum;
  }
  if (pageSize) {
    params.pageSize = +pageSize;
  }
  return defer({
    data: api.getUsers(token, request.signal, params),
    userID
  });
}

export default function adminLoader() {
  console.log('running admin loader');
  const user = selectMain(store.getState());
  if (user.isLoggedIn == true) {
    if (user.user.details.is_superuser === false || user.user.details.is_superuser === null) {
      console.log('Not an admin. Navigating to the dashboard...');
      return redirect('../dashboard');
    }
  } else {
    console.log('Not logged in. Navigating to home page...');
    return redirect('/');
  }
  return null;
}