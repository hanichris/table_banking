import { createBrowserRouter } from "react-router-dom";

import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import adminLoader, {
  dashboardLoader,
  layoutLoader as rootLoader,
  bankListLoader,
  usersLoader,
  createUsers, 
  deleteUser,
  userLoader,
  getMe,
  editUser,
  banksLoader,
  bankLoader,
  editBank} from "./pages/utils";
import Account from "./pages/Account";
import UserProfile from "./pages/UserProfile";
import Bank from "./pages/Bank";
import BanksList from "./pages/BanksList";
import Index from "./pages/DashboardIndex";
import AdminDashboard from "./pages/AdminDashboard";
import UsersListing from "./pages/UsersList";
import EditUser from "./pages/AdminEditUser";
import AdminBanksList from "./pages/AdminBankList";
import AdminViewUser from "./pages/AdminViewUser";
import AdminViewBank from "./pages/AdminViewBank";
import AdminEditBank from "./pages/AdminEditBank";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NoPage />,
    children: [
      {
        index: true,
        loader: rootLoader,
        element: <HomePage />,
      },
      {
        path: 'admin',
        element: <AdminDashboard />,
        loader: adminLoader,
        children: [
          {
            index: true,
            element: <Index />
          },
          {
            path: 'users',
            loader: usersLoader,
            action: createUsers,
            element: <UsersListing />,
          },
          {
            path: 'users/:userID',
            loader: userLoader,
            element: <AdminViewUser />
          },
          {
            path: 'users/:userID/edit',
            loader: userLoader,
            action: editUser,
            element: <EditUser />
          },
          {
            path: 'users/:userID/destroy',
            action: deleteUser
          },
          {
            path: 'banks',
            loader: banksLoader,
            element: <AdminBanksList />
          },
          {
            path: 'banks/:bankID',
            loader: bankLoader,
            element: <AdminViewBank />
          },
          {
            path: 'banks/:bankID/edit',
            loader: bankLoader,
            action: editBank,
            element: <AdminEditBank />
          }
        ]
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
            loader: getMe,
            element: <UserProfile />
          }
        ]
      }
    ],
  }
]);