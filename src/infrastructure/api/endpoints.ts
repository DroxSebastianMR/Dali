export const API_ENDPOINTS = {
  SYSTEM: {
    STATUS: "/system/status",
  },

  AUTH: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh-token",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    SOCIAL_LOGIN: "/auth/social",
  },

  NOTIFICATIONS: {
    REGISTER_TOKEN: "/notifications/register-token",
  },
} as const;
