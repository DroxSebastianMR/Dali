import { useEffect, useState } from "react";

import { getCurrentLocationUseCase } from "@/src/domain/location/location.usecase";

type LocationState = {
  city: string;
  country: string;

  district?: string;

  latitude: number;
  longitude: number;

  loading: boolean;
};

export const useUserLocation = () => {
  const [location, setLocation] = useState<LocationState>({
    city: "Cargando...",
    country: "",

    district: undefined,

    latitude: 0,
    longitude: 0,

    loading: true,
  });

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    try {
      const result = await getCurrentLocationUseCase();

      setLocation({
        city: result.city,
        country: result.country,

        district: result.district,

        latitude: result.latitude,
        longitude: result.longitude,

        loading: false,
      });
    } catch {
      setLocation({
        city: "Ubicación",
        country: "No disponible",

        district: undefined,

        latitude: 0,
        longitude: 0,

        loading: false,
      });
    }
  };

  return location;
};
