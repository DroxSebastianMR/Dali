import { authService } from "@/src/infrastructure/api/auth/services/auth.service";
import {
    LoginResponse,
    RefreshResponse,
} from "@/src/infrastructure/api/auth/services/auth.types";
import {
    isValidEmail,
    normalizeEmail,
} from "@/src/shared/validators/email.validator";

export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const normalizedEmail = normalizeEmail(email);

  if (!isValidEmail(normalizedEmail)) {
    throw new Error("INVALID_EMAIL");
  }

  const response = await authService.login(normalizedEmail, password);

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

export const recoverPassword = async (email: string): Promise<void> => {
  const normalizedEmail = normalizeEmail(email);

  if (!isValidEmail(normalizedEmail)) {
    throw new Error("INVALID_EMAIL");
  }

  await authService.recover(normalizedEmail);
};

export const verifyResetToken = async (token: string): Promise<void> => {
  const normalizedToken = token.trim().toUpperCase();

  if (!normalizedToken) {
    throw new Error("El código es requerido");
  }

  await authService.verify(normalizedToken);
};

export const resetPassword = async (
  token: string,
  newPassword: string,
): Promise<void> => {
  const normalizedToken = token.trim().toUpperCase();

  if (!normalizedToken) {
    throw new Error("El token es requerido");
  }

  if (!newPassword.trim()) {
    throw new Error("La contraseña es requerida");
  }

  if (newPassword.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres");
  }

  await authService.reset(normalizedToken, newPassword);
};
