import { useEffect, useRef, unstable_ViewTransition as ViewTransition } from "react";
import { useSaveProfile } from "../hooks/profiles";
import { useNavigate, Link } from "react-router";
import { ProfileForm } from "../components/ProfileForm";

export function CreateUserPage() {
  const { isPending, save } = useSaveProfile();
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    const dialog = modalRef.current;
    if (dialog) {
      dialog.showModal();
    }
  })

  async function handleAction(formData) {
    await save({
      username: formData.get("username"),
      photo: formData.get("photo") || null,
    });
    navigate("/");
  }

  return (
    <ViewTransition enter="modal-enter" exit="modal-exit">
      <dialog
        ref={modalRef}
        className="m-auto border-2 border-blue-400 rounded-xl 
      shadow-lg w-full max-w-md bg-white 
      backdrop:bg-black/30 backdrop:backdrop-blur-sm"
      >
        <div className="p-8 rounded-xl w-full">
          <div className="flex items-center mb-6">
            <Link
              to="/"
              className="mr-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            >
              ← Volver
            </Link>
            <h2 className="text-2xl font-bold text-blue-700 text-center flex-1">
              Crear perfil
            </h2>
          </div>
          <ProfileForm onSubmit={handleAction} isPending={isPending} />
        </div>
      </dialog>
    </ViewTransition>
  );
}