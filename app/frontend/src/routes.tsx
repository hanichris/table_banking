import { createBrowserRouter } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    errorElement: <NoPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'dashboard',
        element: <h1>Welcome to the dashboard</h1>,
      }
    ],
  }
]);