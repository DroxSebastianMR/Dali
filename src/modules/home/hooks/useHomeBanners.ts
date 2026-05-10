import { useEffect, useState } from "react";

import { getHomeBannersUseCase } from "@/src/domain/home/home.usecase";

import { useUserLocation } from "@/src/modules/location/hooks/useUserLocation";

import { HomeBanner } from "@/src/infrastructure/api/home/services/home.types";

export const useHomeBanners = () => {
  const location = useUserLocation();

  const [banners, setBanners] = useState<HomeBanner[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location.latitude || !location.longitude) {
      return;
    }

    loadBanners();
  }, [location.latitude, location.longitude]);

  const loadBanners = async () => {
    try {
      setLoading(true);

      const response = await getHomeBannersUseCase({
        latitude: location.latitude,
        longitude: location.longitude,

        city: location.city,

        district: location.district,
      });

      setBanners(response.banners);
    } catch (error) {
      console.log("HOME_BANNERS_ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    banners,

    loading,

    reload: loadBanners,
  };
};
