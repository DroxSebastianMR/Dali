import { apiClient } from "@/src/infrastructure/api/client/axios.instance";
import { API_ENDPOINTS } from "@/src/infrastructure/api/endpoints";

export const notificationsService = {
  registerPushToken: async (token: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.NOTIFICATIONS.REGISTER_TOKEN, {
      token,
    });
  },
};
