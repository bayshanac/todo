import { atom } from "jotai";
import { AuthState } from "../types/auth.types";

export const DEFAULT_AUTH_STATE: AuthState = {
  isAuthenticated: false,
  username: null,
};

export const authAtom = atom<AuthState>(DEFAULT_AUTH_STATE);
