import { useEffect } from "react";

type KeyType = string | string[];

export const useKeyPress = (keys: KeyType, callback: () => void) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const keysArray = Array.isArray(keys) ? keys : [keys];
      if (keysArray.includes(e.key)) {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [callback, keys]);
};
