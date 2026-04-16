import React, { createContext, useContext, useEffect, useState } from "react";

import { authService } from "@/src/infrastructure/api/auth/services/auth.service";
import { authStorage } from "@/src/modules/auth/storage/auth.storage";
import { AuthStatus, AuthUser } from "@/src/modules/auth/types/auth.types";

type AuthContextType = {
  status: AuthStatus;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<AuthUser | null>(null);

  // 🔹 INIT AUTH (bootstrap auth real)
  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    try {
      const refreshToken = await authStorage.getRefreshToken();

      if (!refreshToken) {
        setStatus("unauthenticated");
        return;
      }

      // 🔥 usa refresh-token endpoint (flujo real)
      const response = await authService.refreshToken(refreshToken);

      await authStorage.setTokens(response.accessToken, response.refreshToken);

      // 🔥 obtener usuario real
      const user = await authService.me();

      setUser(user);
      setStatus("authenticated");
    } catch (error) {
      await authStorage.clear();
      setUser(null);
      setStatus("unauthenticated");
    }
  };

  // 🔹 LOGIN
  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);

    await authStorage.setTokens(response.accessToken, response.refreshToken);

    setUser(response.user);
    setStatus("authenticated");
  };

  // 🔹 LOGOUT
  const logout = async () => {
    try {
      const refreshToken = await authStorage.getRefreshToken();

      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch {
      // no bloquea logout si falla backend
    } finally {
      await authStorage.clear();
      setUser(null);
      setStatus("unauthenticated");
    }
  };

  return (
    <AuthContext.Provider value={{ status, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 HOOK
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
