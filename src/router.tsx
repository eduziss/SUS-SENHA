import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import { Home } from "./pages/home";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { ProtectedRoute } from "./routers";
import { UpdateUser } from "./pages/update";
import { ListeEnefermeiros } from "./pages/listEnfermeiros/index.";
import { Nav } from "./layout/nav";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />, // Protege a Home
        children: [
          {
            path: "/",
            element: <Home />,
          },
        ],
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/alter/:id",
        element: <UpdateUser />,
      },
    ],
  },
  {
    element: <Nav />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />, // Protege a Home
        children: [
          {
            path: "/listEnfermeiros/:uid",
            element: <ListeEnefermeiros />,
          },
        ],
      },
    ],
  },
]);

export { router };
