import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { ListPage } from "./pages/ListPage";
import { CreateUserPage } from "./pages/CreateUserPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<ListPage />}>
          <Route path="crear" element={<CreateUserPage />} />
        </Route>
      </Route>
    </Routes>
  )
}