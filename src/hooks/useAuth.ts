import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { authAtom, DEFAULT_AUTH_STATE } from "@atoms/authAtom";
import useLocalStorage from "@hooks/useLocalStorage";

const AUTH_STORAGE_KEY = "auth";

export default function useAuth() {
  const [authState, setAuthState] = useAtom(authAtom);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [localStorageValue, setLocalStorageStateValue] = useLocalStorage(
    AUTH_STORAGE_KEY,
    DEFAULT_AUTH_STATE
  );

  const navigate = useNavigate();

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      setAuthState({ isAuthenticated: true, username });
      setIsLoggedIn(true);
      setError(null);
      setLocalStorageStateValue({ isAuthenticated: true, username });
      navigate("/");
    } else {
      setError("Username or password is incorrect. Try again.");
    }
  };

  const logout = () => {
    setAuthState(DEFAULT_AUTH_STATE);
    setLocalStorageStateValue(DEFAULT_AUTH_STATE);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (localStorageValue.isAuthenticated) {
      setAuthState(localStorageValue);
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [localStorageValue, setAuthState, navigate]);

  return {
    authState,
    login,
    logout,
    isLoggedIn,
    error,
  };
}
