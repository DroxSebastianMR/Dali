import * as Location from "expo-location";

export type UserLocation = {
  city: string;
  country: string;
};

const normalizeCity = (value: string): string => {
  return value
    .replace("Provincia de ", "")
    .replace("Departamento de ", "")
    .replace("District of ", "")
    .replace("Department of ", "")
    .trim();
};

export const locationService = {
  getCurrentLocation: async (): Promise<UserLocation> => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      throw new Error("LOCATION_PERMISSION_DENIED");
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const response = await Location.reverseGeocodeAsync({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });

    const place = response[0];

    console.log("LOCATION_DATA", place);

    const rawCity =
      place.district ||
      place.city ||
      place.subregion ||
      place.region ||
      place.name ||
      "Ubicación";

    return {
      city: normalizeCity(rawCity),
      country: place.country || "Desconocido",
    };
  },
};
