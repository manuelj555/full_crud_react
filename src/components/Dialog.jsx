import {
  createContext,
  startTransition,
  use,
  useLayoutEffect,
  useRef,
  unstable_ViewTransition as ViewTransition,
} from "react";
import { useEffectEvent } from "../hooks/useEffectEvent";

const Context = createContext(null);

export function Dialog({ children, className = "", onClose }) {
  const modalRef = useRef(null);
  const onCloseCallback = useEffectEvent(() => {
    const dialog = modalRef.current;
    if (!dialog) return false;

    if (onClose) {
      startTransition(() => {
        onClose(dialog)
      })
    } else {
      dialog.close()
    }
  });

  useLayoutEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return;

    if (!dialog.open) {
      dialog.showModal();
    }

    async function handleKeyDown(e) {
      if (e.key === "Escape") {
        onCloseCallback(dialog);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseCallback]);

  return (
    <ViewTransition enter="modal-enter" exit="modal-exit">
      <dialog
        // eslint-disable-next-line react/no-unknown-property
        closedby="none"
        ref={modalRef}
        className={`
          m-auto border-2 rounded-xl shadow-lg 
          min-w-1/4 bg-white backdrop:bg-black/30 
          backdrop:backdrop-blur-sm 
          ${className}
        `}
      >
        <Context value={{ close: onCloseCallback }}>
          {children}
        </Context>
      </dialog>
    </ViewTransition>
  );
}

export function useCloseDialog() {
  const context = use(Context);
  if (!context) {
    throw new Error("useDialog must be used within a Dialog");
  }
  return context.close;
}
