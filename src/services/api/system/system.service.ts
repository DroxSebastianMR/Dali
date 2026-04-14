import { apiClient } from "@/src/services/api/client/axios.instance";
import { API_ENDPOINTS } from "@/src/services/api/endpoints";
import { SystemStatus } from "@/src/services/api/system/system.types";

export const SystemService = {
  getStatus: async (): Promise<SystemStatus> => {
    const { data } = await apiClient.get<SystemStatus>(
      API_ENDPOINTS.SYSTEM.STATUS,
    );
    return data;
  },
};
