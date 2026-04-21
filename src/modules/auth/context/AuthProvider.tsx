import React, { createContext, useContext, useEffect, useState } from "react";

import { authStorage } from "@/src/modules/auth/storage/auth.storage";
import { AuthStatus, AuthUser } from "@/src/modules/auth/types/auth.types";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshUserToken,
} from "@/src/domain/auth/auth.usecase";

import { loginWithSocialUser } from "@/src/domain/auth/social.usecase";

import { mapUserToAuthUser } from "@/src/infrastructure/api/auth/services/auth.mapper";
import { SocialProvider } from "@/src/infrastructure/api/auth/services/auth.types";

type AuthContextType = {
  status: AuthStatus;
  user: AuthUser | null;

  login: (email: string, password: string) => Promise<void>;
  loginSocial: (provider: SocialProvider, token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<AuthUser | null>(null);

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

      const tokens = await refreshUserToken(refreshToken);

      await authStorage.setTokens(tokens.accessToken, tokens.refreshToken);

      const userDTO = await getCurrentUser();

      setUser(mapUserToAuthUser(userDTO));
      setStatus("authenticated");
    } catch {
      await authStorage.clear();
      setUser(null);
      setStatus("unauthenticated");
    }
  };

  const login = async (email: string, password: string) => {
    const response = await loginUser(email, password);

    await authStorage.setTokens(response.accessToken, response.refreshToken);

    setUser(mapUserToAuthUser(response.user, response.roles));
    setStatus("authenticated");
  };

  const loginSocial = async (provider: SocialProvider, token: string) => {
    const response = await loginWithSocialUser(provider, token);

    await authStorage.setTokens(response.accessToken, response.refreshToken);

    setUser(mapUserToAuthUser(response.user, response.roles));
    setStatus("authenticated");
  };

  const logout = async () => {
    try {
      const refreshToken = await authStorage.getRefreshToken();

      if (refreshToken) {
        await logoutUser(refreshToken);
      }
    } finally {
      await authStorage.clear();
      setUser(null);
      setStatus("unauthenticated");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        login,
        loginSocial,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
