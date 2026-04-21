import { authService } from "@/src/infrastructure/api/auth/services/auth.service";
import {
  LoginResponse,
  SocialProvider,
} from "@/src/infrastructure/api/auth/services/auth.types";

export class SocialAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SocialAuthError";
  }
}

export const loginWithSocialUser = async (
  provider: SocialProvider,
  token: string,
): Promise<LoginResponse> => {
  if (!token || token.trim().length === 0) {
    throw new SocialAuthError("Token de autenticación inválido");
  }

  if (!provider) {
    throw new SocialAuthError("Proveedor no válido");
  }

  try {
    // 🔥 YA NO TRANSFORMAS NADA
    const response = await authService.loginSocial(provider, token);

    if (!response?.accessToken || !response?.refreshToken) {
      throw new SocialAuthError("Respuesta inválida del servidor");
    }

    return response; // ✅ DIRECTO
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw new SocialAuthError("Credenciales sociales inválidas");
    }

    if (error?.response?.status === 403) {
      throw new SocialAuthError("Acceso denegado");
    }

    if (error?.message === "Network Error") {
      throw new SocialAuthError("Sin conexión a internet");
    }

    throw new SocialAuthError("Error en login social");
  }
};
