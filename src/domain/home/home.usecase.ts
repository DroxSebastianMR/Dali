import { homeService } from "@/src/infrastructure/api/home/services/home.service";

export type GetHomeBannersInput = {
  latitude: number;
  longitude: number;
  city: string;
  district?: string;
};

export const getHomeBannersUseCase = async (input: GetHomeBannersInput) => {
  return homeService.getHomeBanners(input);
};
