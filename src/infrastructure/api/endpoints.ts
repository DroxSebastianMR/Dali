export const API_ENDPOINTS = {
  SYSTEM: {
    STATUS: "/system/status",
  },

  AUTH: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh-token",
    LOGOUT: "/auth/logout",
    SOCIAL_LOGIN: "/auth/social",
    RECOVER: "/auth/recover-password",
  },

  USERS: {
    ME: "/users/me",
  },

  NOTIFICATIONS: {
    REGISTER_TOKEN: "/notifications/register-token",
  },
} as const;
