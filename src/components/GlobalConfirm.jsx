import {
  useDeferredValue,
  useState,
  useSyncExternalStore,
  useTransition,
} from "react";
import { Dialog } from "./Dialog";

export function confirm(onConfirm, { title, content, success } = {}) {
  config = {
    onConfirm,
    title: title || "Confirmar acción",
    content: content || "¿Estás seguro de que quieres continuar?",
    success: success ?? null,
  };

  callback?.();
}

let config = null;
let callback = null;

function close() {
  config = null;
  callback?.();
}

function useGetConfirm() {
  return useSyncExternalStore(
    (subscribe) => {
      callback = subscribe;
      return () => {
        callback = null;
      };
    },
    () => config
  );
}

export function GlobalConfirm() {
  const originalConfig = useGetConfirm();
  const config = useDeferredValue(originalConfig);
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  if (!config) {
    return null;
  }

  function handleConfirm() {
    startTransition(async () => {
      if (config.onConfirm) {
        await config.onConfirm();
      }

      if (config.success) {
        startTransition(() => {
          setIsSuccess(true);
        });
      } else {
        handleClose();
      }
    });
  }

  function handleClose() {
    setIsSuccess(false);
    close();
  }

  return (
    <Dialog onClose={handleClose} className="max-w-md w-full">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">{config.title}</h3>
        <p className="mb-4">{isSuccess ? config.success : config.content}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            disabled={isPending}
          >
            {isSuccess ? "Cerrar" : "Cancelar"}
          </button>
          {!isSuccess && (
            <button
              type="button"
              onClick={handleConfirm}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              disabled={isPending}
            >
              {isPending ? "Ejecutando..." : "Aceptar"}
            </button>
          )}
        </div>
      </div>
    </Dialog>
  );
}
