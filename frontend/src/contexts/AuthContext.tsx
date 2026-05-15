import { createContext, useContext, useState, type ReactNode } from "react";
import api from "../services/api";
import type { Usuario, AuthResponse } from "../types";

interface AuthContextType {
  user: Usuario | null;
  token: string | null;
  signIn: (email: string, senha: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(() => {
    const stored = localStorage.getItem("@sge:user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("@sge:token");
  });

  async function signIn(email: string, senha: string) {
    const { data } = await api.post<AuthResponse>("/api/auth/login", {
      email,
      senha,
    });
    localStorage.setItem("@sge:token", data.token);
    localStorage.setItem("@sge:user", JSON.stringify(data.usuario));
    setToken(data.token);
    setUser(data.usuario);
  }

  function signOut() {
    localStorage.removeItem("@sge:token");
    localStorage.removeItem("@sge:user");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, token, signIn, signOut, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
