export type TokenDTO = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  refresh_expires_in: number;
};

export type UserDTO = {
  id: number;

  email: string;

  first_name: string;

  last_name: string;

  phone: string | null;

  photo_url: string | null;

  status: string;

  email_verified: boolean;

  telefono_verified: boolean;

  last_login_at: string;

  created_at: string;
};

export type RoleDTO = {
  id: number;
  name: string;
};

export type AuthApiResponse = {
  token: TokenDTO;

  user: UserDTO;

  authorization: {
    roles: RoleDTO[];
  };

  context: {
    businesses: any[];
  };

  meta: {
    server_time: string;
    enviroment: string;
  };
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = AuthTokens & {
  user: UserDTO;
  roles: RoleDTO[];
};

export type RefreshResponse = AuthTokens;

export type MeResponse = UserDTO;

export type SocialProvider = "google" | "facebook" | "apple";
