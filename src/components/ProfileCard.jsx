import { Link } from "react-router";
import { useDeleteProfile } from "../hooks/profiles";
import { startTransition, useState } from "react";
import { Dialog } from "./Dialog";
import { useSpinDelay } from "spin-delay";

export function ProfileCard({ profile }) {
  const { isPending: isRemoving, remove } = useDeleteProfile();
  const [showConfirm, setShowConfirm] = useState(false);
  const isPending = useSpinDelay(isRemoving, { delay: 80, minDuration: 1200 });

  function toggleConfirm(show) {
    startTransition(() => {
      setShowConfirm(show);
    });
  }

  async function handleRemove() {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    startTransition(async () => {
      await remove(profile.id);
      toggleConfirm(false);
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-200">
      {profile.photo ? (
        <img
          src={profile.photo}
          alt={profile.username}
          className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-blue-200 shadow"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-700 font-bold mb-4 uppercase">
          {profile.username?.charAt(0) || '?'}
        </div>
      )}
      <div className="text-lg font-semibold text-gray-800 mb-1">
        {profile.username}
      </div>
      <div className="flex gap-4 mt-3 items-center">
        <Link
          to={`/editar/${profile.id}`}
          className="bg-yellow-500 text-white px-3 py-1 rounded font-medium shadow hover:bg-yellow-600"
        >
          Editar
        </Link>
        <button
          type="button"
          onClick={() => toggleConfirm(true)}
          className="text-sm text-gray-500 hover:text-red-600 hover:underline disabled:text-gray-300"
        >
          Eliminar
        </button>
        {showConfirm && (
          <Dialog onClose={() => toggleConfirm(false)}>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                ¿Confirmar eliminación?
              </h3>
              <p className="mb-4">
                ¿Estás seguro de que quieres eliminar a {profile.username}? Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => toggleConfirm(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                  disabled={isPending}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  disabled={isPending}
                >
                  {isPending ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
}
