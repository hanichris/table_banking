import { createBrowserRouter } from "react-router-dom";

import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { dashboardLoader, layoutLoader as rootLoader } from "./pages/utils";
import Account from "./pages/Account";
import UserProfile from "./pages/UserProfile";
import Bank from "./pages/Bank";
import BanksList from "./pages/BanksList";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NoPage />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'dashboard',
        loader: dashboardLoader,
        element: <Dashboard />,
        children: [
          {
            path: 'account',
            element: <Account />,
          },
          {
            path: 'banks/:bankId',
            element: <Bank />
          },
          {
            path: 'banks',
            element: <BanksList />
          },
          {
            path: 'profile',
            element: <UserProfile />
          }
        ]
      }
    ],
  }
]);