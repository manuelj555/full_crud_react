import { useNavigate } from "react-router";
import { useSaveProfile } from "../hooks/profiles";
import { useSpinDelay } from "spin-delay";

export function ProfileForm({ defaultValues = {}, submitLabel = "Guardar" }) {
  const { save, isPending: isMutating } = useSaveProfile();
  const isPending = useSpinDelay(isMutating, { delay: 60, minDuration: 1200 });

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await save({
        id: defaultValues?.id,
        username: formData.get("username"),
        photo: formData.get("photo") || null,
      });
      navigate("/");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  }

  return (
    <div className="flex gap-8 items-start">
      {defaultValues.photo && defaultValues.id && (
        <div className="flex flex-col items-center min-w-[160px]">
          <span className="text-xs text-gray-500 mb-2">Foto guardada</span>
          <img
            src={defaultValues.photo}
            alt="Foto guardada"
            className="w-40 h-40 rounded-full object-cover border-2 border-blue-200 shadow"
          />
        </div>
      )}
      <form className="space-y-5 flex-1" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Usuario *
          </label>
          <input
            name="username"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            placeholder="Nombre de usuario"
            defaultValue={defaultValues.username || ""}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Foto (URL)
          </label>
          <input
            name="photo"
            type="url"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="https://..."
            defaultValue={defaultValues.photo || ""}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
          disabled={isPending}
        >
          {isPending ? "Guardando..." : submitLabel}
        </button>
      </form>
    </div>
  );
}
