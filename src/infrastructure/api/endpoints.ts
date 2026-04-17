export const API_ENDPOINTS = {
  SYSTEM: {
    STATUS: "/system/status",
  },

  AUTH: {
    LOGIN: "/clientes/auth/login",
    REFRESH: "/clientes/auth/refresh-token",
    LOGOUT: "/clientes/auth/logout",
    ME: "/clientes/auth/me",
  },

  NOTIFICATIONS: {
    REGISTER_TOKEN: "/notifications/register-token",
  },
} as const;
