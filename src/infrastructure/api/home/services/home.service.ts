import { apiClient } from "@/src/infrastructure/api/client/axios.instance";

import { API_ENDPOINTS } from "@/src/infrastructure/api/endpoints";

import { HomeBannersResponse } from "./home.types";

type GetHomeBannersPayload = {
  latitude: number;

  longitude: number;

  city: string;

  district?: string;
};

export const homeService = {
  getHomeBanners: async (
    payload: GetHomeBannersPayload,
  ): Promise<HomeBannersResponse> => {
    const { data } = await apiClient.post<HomeBannersResponse>(
      API_ENDPOINTS.HOME.BANNERS,
      payload,
    );

    return data;
  },
};
