import { authService } from "@/src/infrastructure/api/auth/services/auth.service";
import {
    LoginResponse,
    MeResponse,
    RefreshResponse,
} from "@/src/infrastructure/api/auth/services/auth.types";

export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await authService.login(email, password);

  if (!response.accessToken) {
    throw new Error("Token inválido");
  }

  return response;
};

export const refreshUserToken = async (
  refreshToken: string,
): Promise<RefreshResponse> => {
  const response = await authService.refreshToken(refreshToken);

  if (!response.accessToken) {
    throw new Error("No se pudo refrescar el token");
  }

  return response;
};

export const getCurrentUser = async (): Promise<MeResponse> => {
  return await authService.me();
};

export const logoutUser = async (refreshToken: string) => {
  await authService.logout(refreshToken);
};
