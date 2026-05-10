import {
  locationService,
  UserLocation,
} from "@/src/infrastructure/device/location/location.service";

export const getCurrentLocationUseCase = async (): Promise<UserLocation> => {
  try {
    return await locationService.getCurrentLocation();
  } catch {
    return {
      city: "Ubicación",
      country: "No disponible",

      district: undefined,

      latitude: 0,
      longitude: 0,
    };
  }
};
