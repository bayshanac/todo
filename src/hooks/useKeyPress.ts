import { useEffect } from "react";

type KeyType = string | string[];

export const useKeyPress = (keys: KeyType, callback: () => void) => {
  useEffect(() => {
    const controller = new AbortController();

    const handleKeyPress = (e: KeyboardEvent) => {
      const keysArray = Array.isArray(keys) ? keys : [keys];
      if (keysArray.includes(e.key)) {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyPress, {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, [callback, keys]);
};
