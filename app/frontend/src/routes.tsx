import { createBrowserRouter } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NoPage />
  }
]);