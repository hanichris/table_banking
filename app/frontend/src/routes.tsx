import { createBrowserRouter } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { dashboardLoader } from "./pages/utils";
import Account from "./pages/Account";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NoPage />,
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
            path: 'banks',
            element: <h2>Banks</h2>
          }
        ]
      }
    ],
  }
]);