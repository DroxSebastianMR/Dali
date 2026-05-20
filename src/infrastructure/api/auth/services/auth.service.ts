import {
  AuthApiResponse,
  LoginResponse,
  RefreshResponse,
  SocialProvider,
} from "./auth.types";

import { mapAuthResponse, mapRefreshResponse } from "./auth.mapper";

import { apiClient } from "@/src/infrastructure/api/client/axios.instance";
import { API_ENDPOINTS } from "@/src/infrastructure/api/endpoints";

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const { data } = await apiClient.post<AuthApiResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      { email, password },
    );

    return mapAuthResponse(data);
  },

  refreshToken: async (refreshToken: string): Promise<RefreshResponse> => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH, {
      refresh_token: refreshToken,
    });

    return mapRefreshResponse(data);
  },

  logout: async (refreshToken: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, {
      refresh_token: refreshToken,
    });
  },

  recover: async (email: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.RECOVER, { email });
  },

  verify: async (token: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.VERIFY, { token });
  },

  loginSocial: async (
    provider: SocialProvider,
    token: string,
  ): Promise<LoginResponse> => {
    const { data } = await apiClient.post<AuthApiResponse>(
      API_ENDPOINTS.AUTH.SOCIAL_LOGIN,
      {
        provider,
        token,
      },
    );

    return mapAuthResponse(data);
  },
};
