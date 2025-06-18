import { useActionState } from "react";
import { useSaveProfile } from "../hooks/profiles";
import { useNavigate } from "react-router";

export function ProfileForm({ defaultValues = {}, submitLabel = "Guardar" }) {
  const { save } = useSaveProfile();
  const navigate = useNavigate();
  const [formData, formAction, isPending] = useActionState(handleSubmit, null);

  async function handleSubmit(prev, formData) {
    await save({
      id: defaultValues?.id,
      username: formData.get("username"),
      photo: formData.get("photo") || null,
    });
    navigate("/");
  }

  return (
    <form className="space-y-5" action={formAction}>
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
  );
}
