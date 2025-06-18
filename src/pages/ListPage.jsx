import { Link, Outlet } from "react-router";
import { useGetProfiles } from "../hooks/profiles";

export function ListPage() {
  const { isLoading, profiles } = useGetProfiles();

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
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-200"
            >
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt={profile.username}
                  className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-blue-200 shadow"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-700 font-bold mb-4 uppercase">
                  {profile.username?.charAt(0) || "?"}
                </div>
              )}
              <div className="text-lg font-semibold text-gray-800 mb-1">
                {profile.username}
              </div>
              <Link
                to={`/editar/${profile.id}`}
                className="mt-3 bg-yellow-500 text-white px-3 py-1 rounded font-medium shadow hover:bg-yellow-600"
              >
                Editar
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
}
