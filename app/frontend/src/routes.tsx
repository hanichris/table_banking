import { createBrowserRouter } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NoPage />,
    children: [
      {
        path: '',
        element: null,
      }
    ],
  }
]);