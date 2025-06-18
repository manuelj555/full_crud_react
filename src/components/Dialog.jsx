import { useLayoutEffect, useRef, unstable_ViewTransition as ViewTransition } from "react";

/**
 * Dialog modal reutilizable con animación ViewTransition.
 * Props:
 * - className: clases extra para el dialog
 * - children: contenido del modal
 */
export function Dialog({ children, className = "" }) {
  const modalRef = useRef(null);

  useLayoutEffect(() => {
    const dialog = modalRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  return (
    <ViewTransition enter="modal-enter" exit="modal-exit">
      <dialog
        ref={modalRef}
        className={`m-auto border-2 rounded-xl shadow-lg w-full max-w-md bg-white backdrop:bg-black/30 backdrop:backdrop-blur-sm ${className}`}
      >
        {children}
      </dialog>
    </ViewTransition>
  );
}
