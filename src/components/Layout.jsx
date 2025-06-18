// react laout with header and footer
import { unstable_ViewTransition as ViewTransition } from "react";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl">My Application</h1>
      </header>
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2023 My Application
      </footer>
    </div>
  );
}
