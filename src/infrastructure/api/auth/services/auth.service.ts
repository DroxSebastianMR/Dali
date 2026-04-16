import {
  LoginResponse,
  MeResponse,
  RefreshResponse,
} from "@/src/infrastructure/api/auth/services/auth.types";
import { apiClient } from "@/src/infrastructure/api/client/axios.instance";
import { API_ENDPOINTS } from "@/src/infrastructure/api/endpoints";

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      {
        email,
        password,
      },
    );

    return data;
  },

  refreshToken: async (refreshToken: string): Promise<RefreshResponse> => {
    const { data } = await apiClient.post<RefreshResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      {
        refresh_token: refreshToken,
      },
    );

    return data;
  },

  me: async (): Promise<MeResponse> => {
    const { data } = await apiClient.get<MeResponse>(API_ENDPOINTS.AUTH.ME);

    return data;
  },

  // 🔓 LOGOUT
  logout: async (refreshToken: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, {
      refresh_token: refreshToken,
    });
  },
};
