import { APP_CONFIG } from "@/src/config/app.config";
import { AxiosError, AxiosInstance } from "axios";

export const setupInterceptors = (client: AxiosInstance) => {
  client.interceptors.request.use(
    (config) => {
      config.headers["x-platform"] = APP_CONFIG.PLATFORM;
      config.headers["x-app-version"] = APP_CONFIG.VERSION;
      return config;
    },
    (error) => Promise.reject(error),
  );
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (!error.response) {
        return Promise.reject({ type: "NETWORK_ERROR", error });
      }

      switch (error.response.status) {
        case 401:
          return Promise.reject({ type: "UNAUTHORIZED", error });

        case 403:
          return Promise.reject({ type: "FORBIDDEN", error });

        case 503:
          return Promise.reject({ type: "MAINTENANCE", error });

        default:
          return Promise.reject({
            type: "API_ERROR",
            status: error.response.status,
            error,
          });
      }
    },
  );
};
