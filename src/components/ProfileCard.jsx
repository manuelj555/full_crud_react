import { Link, useNavigate } from 'react-router'
import { useDeleteProfile, usePrefetchProfile } from '../hooks/profiles'
import { confirm } from './GlobalConfirm'
import { unstable_ViewTransition as ViewTransition } from 'react'
import PendingAction from './PendingAction'

export function ProfileCard({ profile }) {
  const { remove } = useDeleteProfile()
  const navigate = useNavigate()
  const prefetch = usePrefetchProfile(profile.id)

  async function handleRemove() {
    await new Promise((resolve) => setTimeout(resolve, 10)) // Simulate delay
    await remove(profile.id)
  }

  function showDeleteConfirm() {
    confirm(handleRemove, {
      title: '¿Confirmar eliminación?',
      content: (
        <>
          ¿Estás seguro de que quieres eliminar a <strong>{profile.username}</strong>? Esta acción no se puede deshacer.
        </>
      ),
      // success: "Eliminado correctamente",
    })
  }

  return (
    <div
      className={`
    bg-white rounded-xl shadow-md 
    p-6 flex flex-col 
    items-center hover:shadow-lg 
    transition-shadow duration-200
    ${profile.deleting ? 'opacity-50 pointer-events-none' : ''}
    `}
    >
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
      <div className="text-lg font-semibold text-gray-800 mb-1">{profile.username}</div>
      <div className="flex gap-4 mt-3 items-center">
        <PendingAction
          action={async () => {
            await prefetch()
            navigate(`/editar/${profile.id}`)
          }}
          render={({ isPending, onNavigate }) => (
            <Link
              to={`/editar/${profile.id}`}
              onClick={onNavigate}
              className="bg-yellow-500 text-white px-3 py-1 rounded font-medium shadow hover:bg-yellow-600"
            >
              Editar {isPending ? '...' : ''}
            </Link>
          )}
        />
        <button
          type="button"
          onClick={showDeleteConfirm}
          className="text-sm text-gray-500 hover:text-red-600 hover:underline disabled:text-gray-300"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
