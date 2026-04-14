export const API_ENDPOINTS = {
  SYSTEM: {
    STATUS: "/system/status",
  },

  AUTH: {
    LOGIN: "/clientes/auth/login",
    REFRESH: "/clientes/auth/refresh",
  },

  PLANES: {
    LIST: "/planes",
  },
} as const;
