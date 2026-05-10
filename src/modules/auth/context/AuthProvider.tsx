import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  logoutUser,
  refreshUserToken,
} from "@/src/domain/auth/auth.usecase";

import { loginWithSocialUser } from "@/src/domain/auth/social.usecase";

import { getCurrentUser } from "@/src/domain/users/users.usecase";

import { mapUserToAuthUser } from "@/src/infrastructure/api/auth/services/auth.mapper";

import { SocialProvider } from "@/src/infrastructure/api/auth/services/auth.types";

import { authStorage } from "@/src/modules/auth/storage/auth.storage";

import { AuthStatus, AuthUser } from "@/src/modules/auth/types/auth.types";

type AuthContextType = {
  status: AuthStatus;

  user: AuthUser | null;

  setAuth: (user: AuthUser | null, status: AuthStatus) => void;

  bootstrapAuth: (refreshToken: string) => void;

  hydrateUser: (refreshToken: string) => Promise<void>;

  login: (email: string, password: string) => Promise<void>;

  loginSocial: (provider: SocialProvider, token: string) => Promise<void>;

  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<AuthStatus>("checking");

  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    loadCachedUser();
  }, []);

  const loadCachedUser = async () => {
    try {
      const cachedUser = await authStorage.getUser();

      if (!cachedUser) {
        setStatus("unauthenticated");
        return;
      }

      setUser(cachedUser);

      setStatus("authenticated");
    } catch (error) {
      console.log("Error loading cached user:", error);

      setStatus("unauthenticated");
    }
  };

  const setAuth = async (user: AuthUser | null, status: AuthStatus) => {
    setUser(user);

    setStatus(status);

    if (user) {
      await authStorage.setUser(user);
    }
  };

  const bootstrapAuth = useCallback((refreshToken: string) => {
    setStatus("authenticated");

    void hydrateUser(refreshToken);
  }, []);

  const hydrateUser = async (refreshToken: string) => {
    try {
      const tokens = await refreshUserToken(refreshToken);

      await authStorage.setTokens(tokens.accessToken, tokens.refreshToken);

      const userDTO = await getCurrentUser();

      const mappedUser = mapUserToAuthUser(
        userDTO.user,
        userDTO.authorization.roles,
      );

      setUser(mappedUser);

      await authStorage.setUser(mappedUser);

      setStatus("authenticated");
    } catch (error) {
      console.log("Error hydrating user:", error);

      await authStorage.clear();

      setUser(null);

      setStatus("unauthenticated");
    }
  };

  const login = async (email: string, password: string) => {
    const response = await loginUser(email, password);

    await authStorage.setTokens(response.accessToken, response.refreshToken);

    const mappedUser = mapUserToAuthUser(response.user, response.roles);

    setUser(mappedUser);

    await authStorage.setUser(mappedUser);

    setStatus("authenticated");
  };

  const loginSocial = async (provider: SocialProvider, token: string) => {
    const response = await loginWithSocialUser(provider, token);

    await authStorage.setTokens(response.accessToken, response.refreshToken);

    const mappedUser = mapUserToAuthUser(response.user, response.roles);

    setUser(mappedUser);

    await authStorage.setUser(mappedUser);

    setStatus("authenticated");
  };

  const logout = async () => {
    try {
      const refreshToken = await authStorage.getRefreshToken();

      if (refreshToken) {
        await logoutUser(refreshToken);
      }
    } catch (error) {
      console.log("Error logout:", error);
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
        setAuth,

        bootstrapAuth,
        hydrateUser,

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
