import { Link } from "react-router";
import { ProfileForm } from "../components/ProfileForm";
import { Dialog } from "../components/Dialog";

export function CreateUserPage() {
  return (
    <Dialog className="border-blue-400">
      <div className="p-8 rounded-xl w-full">
        <div className="flex items-center mb-6">
          <Link
            to="/"
            className="mr-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            ← Volver
          </Link>
          <h2 className="text-2xl font-bold text-blue-700 text-center flex-1">
            Crear perfil
          </h2>
        </div>
        <ProfileForm />
      </div>
    </Dialog>
  );
}
