export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = AuthTokens & {
  user: {
    id: string;
    email: string;
  };
};

export type RefreshResponse = AuthTokens;

export type MeResponse = {
  id: string;
  email: string;
};
