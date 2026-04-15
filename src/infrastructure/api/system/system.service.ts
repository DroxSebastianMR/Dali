import { apiClient } from "@/src/infrastructure/api/client/axios.instance";
import { API_ENDPOINTS } from "@/src/infrastructure/api/endpoints";
import { SystemStatus } from "@/src/infrastructure/api/system/system.types";

export const SystemService = {
  getStatus: async (): Promise<SystemStatus> => {
    const { data } = await apiClient.get<SystemStatus>(
      API_ENDPOINTS.SYSTEM.STATUS,
    );
    return data;
  },
};
