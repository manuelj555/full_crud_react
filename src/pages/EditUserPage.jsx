import { Dialog } from "../components/Dialog";
import { Link, useParams } from "react-router";
import { ProfileForm } from "../components/ProfileForm";
import { useGetProfile } from "../hooks/profiles";
import { ProfileFormLoading } from "../components/ProfileFormLoading";

export function EditUserPage() {
  const { id } = useParams();
  const { isLoading, profile } = useGetProfile(id);

  return (
    <Dialog className="border-yellow-400">
      <div className="p-8 rounded-xl w-full">
        <div className="flex items-center mb-6">
          <Link
            to="/"
            className="mr-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            ← Volver
          </Link>
          <h2 className="text-2xl font-bold text-yellow-700 text-center flex-1">
            Editar perfil
          </h2>
        </div>
        {isLoading ? (
          <ProfileFormLoading />
        ) : (
          <ProfileForm defaultValues={profile} submitLabel="Actualizar" />
        )}
      </div>
    </Dialog>
  );
}
