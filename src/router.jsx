import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./components/Layout";
import { ListPage } from "./pages/ListPage";
import { CreateUserPage } from "./pages/CreateUserPage";
import { EditUserPage } from "./pages/EditUserPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ListPage />,
        children: [
          {
            path: "crear",
            element: <CreateUserPage />,
          },
          {
            path: "editar/:id",
            element: <EditUserPage />,
          },
        ],
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
