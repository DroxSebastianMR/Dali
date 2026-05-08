import { apiClient } from "@/src/infrastructure/api/client/axios.instance";

import { API_ENDPOINTS } from "@/src/infrastructure/api/endpoints";
import { MeResponse } from "@/src/infrastructure/api/users/services/users.types";

export const usersService = {
  me: async (): Promise<MeResponse> => {
    const { data } = await apiClient.get<MeResponse>(API_ENDPOINTS.USERS.ME);

    return data;
  },
};
