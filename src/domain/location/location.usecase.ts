import {
    locationService,
    UserLocation,
} from "@/src/infrastructure/device/location/location.service";

export const getCurrentLocationUseCase = async (): Promise<UserLocation> => {
  try {
    return await locationService.getCurrentLocation();
  } catch (error) {
    return {
      city: "Ubicación",
      country: "No disponible",
    };
  }
};
