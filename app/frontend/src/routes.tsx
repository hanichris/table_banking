import { createBrowserRouter } from "react-router-dom";

import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { dashboardLoader, layoutLoader as rootLoader, bankListLoader } from "./pages/utils";
import Account from "./pages/Account";
import UserProfile from "./pages/UserProfile";
import Bank from "./pages/Bank";
import BanksList from "./pages/BanksList";
import Index from "./pages/DashboardIndex";

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
            index: true,
            element: <Index />
          },
          {
            path: 'account',
            element: <Account />,
          },
          {
            path: 'banks/:bankId/edit',
            element: <p>Welcome to the bank edit page</p>,
          },
          {
            path: 'banks/:bankId',
            element: <Bank />
          },
          {
            path: 'banks',
            loader: bankListLoader,
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