import React, { createContext, useContext, useEffect, useState } from "react";
import { authStorage } from "../storage/auth.storage";
import { AuthStatus, AuthUser } from "../types/auth.types";

type AuthContextType = {
  status: AuthStatus;
  user: AuthUser | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const token = await authStorage.getToken();

        if (token) {
          // simular fetch user
          setUser({ id: "1", email: "test@mail.com" });
          setStatus("authenticated");
        } else {
          setStatus("unauthenticated");
        }
      } catch {
        setStatus("unauthenticated");
      }
    };

    bootstrapAuth();
  }, []);

  const login = async () => {
    await authStorage.setToken("fake-token");

    setUser({ id: "1", email: "test@mail.com" });
    setStatus("authenticated");
  };

  const logout = async () => {
    await authStorage.removeToken();
    setUser(null);
    setStatus("unauthenticated");
  };

  return (
    <AuthContext.Provider value={{ status, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
