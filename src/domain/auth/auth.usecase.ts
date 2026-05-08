import { authService } from "@/src/infrastructure/api/auth/services/auth.service";
import {
  LoginResponse,
  RefreshResponse
} from "@/src/infrastructure/api/auth/services/auth.types";

export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await authService.login(email, password);

  if (!response?.accessToken || !response?.refreshToken) {
    throw new Error("Respuesta inválida del servidor");
  }

  return response;
};

export const refreshUserToken = async (
  refreshToken: string,
): Promise<RefreshResponse> => {
  const response = await authService.refreshToken(refreshToken);

  if (!response?.accessToken) {
    throw new Error("No se pudo refrescar el token");
  }

  return response;
};

export const logoutUser = async (refreshToken: string): Promise<void> => {
  await authService.logout(refreshToken);
};
