import {
  useLayoutEffect,
  useRef,
  unstable_ViewTransition as ViewTransition,
} from "react";
import { useNavigate } from "react-router";

export function Dialog({ children, className = "", redirectUrl }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return;

    if (!dialog.open) {
      dialog.showModal();
    }

    async function handleKeyDown(e) {
      if (e.key === "Escape") {
        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          dialog.close();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [redirectUrl, navigate]);

  return (
    <ViewTransition enter="modal-enter" exit="modal-exit">
      <dialog
        closedby="none"
        ref={modalRef}
        className={`m-auto border-2 rounded-xl shadow-lg min-w-1/4 bg-white backdrop:bg-black/30 backdrop:backdrop-blur-sm ${className}`}
      >
        {children}
      </dialog>
    </ViewTransition>
  );
}
