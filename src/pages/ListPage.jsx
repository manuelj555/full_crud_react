import { Link, Outlet } from "react-router";
import { useGetProfiles } from "../hooks/profiles";
import { ProfileCard } from "../components/ProfileCard";
import { useDeferredValue } from "react";
import { unstable_ViewTransition as ViewTransition } from "react";

export function ListPage() {
  const { isLoading, profiles: originalProfiles } = useGetProfiles();
  const profiles = useDeferredValue(originalProfiles);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-xl text-blue-600 font-semibold">
        Cargando Usuarios...
      </div>
    );
  }

  return (
    <>
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700 tracking-wide">
            Usuarios
          </h1>
          <Link
            to="/crear"
            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-700"
          >
            Crear usuario
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {profiles?.map((profile) => (
            <ViewTransition key={profile.id}>
              <ProfileCard key={profile.id} profile={profile} />
            </ViewTransition>        
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
}
