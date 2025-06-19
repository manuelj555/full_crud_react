import { useRef, useCallback, useLayoutEffect } from "react";

/**
 * Retorna una función estable que siempre apunta a la última versión del callback.
 * Útil para usar en efectos o suscripciones sin problemas de dependencias.
 */
export function useEffectEvent(fn) {
  const ref = useRef(fn);

  useLayoutEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback((...args) => {
    return ref.current(...args);
  }, []);
}
