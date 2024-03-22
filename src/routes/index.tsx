import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Users } from "../users";
import { ErrorPage } from "../views/ErrorPage";

export const AppRoutes: React.FC = () => {
  return <RouterProvider router={getUserRoutes()} />;
};

const getUserRoutes = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/",
        element: <Navigate to={"/users"} />,
        errorElement: <ErrorPage />,
      },
    ]    
  );
  return router;
};
