import * as SecureStore from "expo-secure-store";

import { AuthUser } from "@/src/modules/auth/types/auth.types";

const ACCESS_TOKEN = "access_token";

const REFRESH_TOKEN = "refresh_token";

const USER_CACHE = "user_cache";

export const authStorage = {
  setTokens: async (access: string, refresh: string) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN, access);

    await SecureStore.setItemAsync(REFRESH_TOKEN, refresh);
  },

  getAccessToken: () => SecureStore.getItemAsync(ACCESS_TOKEN),

  getRefreshToken: () => SecureStore.getItemAsync(REFRESH_TOKEN),

  setUser: async (user: AuthUser) => {
    await SecureStore.setItemAsync(USER_CACHE, JSON.stringify(user));
  },

  getUser: async (): Promise<AuthUser | null> => {
    const data = await SecureStore.getItemAsync(USER_CACHE);

    if (!data) return null;

    return JSON.parse(data);
  },

  clear: async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);

    await SecureStore.deleteItemAsync(REFRESH_TOKEN);

    await SecureStore.deleteItemAsync(USER_CACHE);
  },
};
