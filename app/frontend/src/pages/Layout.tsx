import { Outlet, useLoaderData, useNavigate } from "react-router-dom";

import NavBar from "../components/navbar/NavBar";
import { useLayoutEffect } from "react";
import { MainState } from "../store/main/state";

export default function Layout() {
  const user = useLoaderData() as MainState | null;
  const navigate = useNavigate();

  useLayoutEffect(() => {
    let loggedIn = false;
    if (user && user.isLoggedIn == true) {
      console.log('Navigating to the dashboard...')
      loggedIn = true;
      const goToDashboard = () => navigate('/dashboard');
      if (loggedIn) goToDashboard();
    }
    return () => { loggedIn = false; }
  }, [user, navigate])

  return (
    <>
      <NavBar />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}