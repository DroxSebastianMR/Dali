import {
    AuthApiResponse,
    LoginResponse,
    RefreshResponse,
    RoleDTO,
    UserDTO,
} from "@/src/infrastructure/api/auth/services/auth.types";

import { AuthUser } from "@/src/modules/auth/types/auth.types";

export const mapAuthResponse = (data: AuthApiResponse): LoginResponse => {
  return {
    accessToken: data.token.access_token,
    refreshToken: data.token.refresh_token,
    user: data.user,
    roles: data.authorization.roles,
  };
};

export const mapRefreshResponse = (data: any): RefreshResponse => {
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
};

export const mapUserToAuthUser = (
  user: UserDTO,
  roles?: RoleDTO[],
): AuthUser => {
  return {
    id: user.id.toString(),
    email: user.email,
    nombre: user.nombre,
    roles: roles?.map((r) => r.name),
  };
};
