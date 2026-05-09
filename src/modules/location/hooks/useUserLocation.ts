import { useEffect, useState } from "react";

import { getCurrentLocationUseCase } from "@/src/domain/location/location.usecase";

type LocationState = {
  city: string;
  country: string;
  loading: boolean;
};

export const useUserLocation = () => {
  const [location, setLocation] = useState<LocationState>({
    city: "Cargando...",
    country: "",
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
        loading: false,
      });
    } catch {
      setLocation({
        city: "Ubicación",
        country: "No disponible",
        loading: false,
      });
    }
  };

  return location;
};
