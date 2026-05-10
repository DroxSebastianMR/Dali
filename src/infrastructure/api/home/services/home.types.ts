export type BannerTarget = {
  type:
    | "BUSINESS"
    | "CATEGORY"
    | "PRODUCT"
    | "PROMOTION"
    | "SEARCH"
    | "EXTERNAL_LINK";

  businessId?: number;

  categoryId?: number;

  productId?: number;

  searchQuery?: string;

  externalUrl?: string;
};

export type HomeBanner = {
  id: number;

  title: string;

  subtitle?: string;

  imageUrl: string;

  backgroundColor?: string;

  badgeText?: string;

  badgeColor?: string;

  type: "PROMOTION" | "BUSINESS" | "EVENT" | "NEARBY" | "RECOMMENDATION";

  ctaText?: string;

  priority: number;

  target: BannerTarget;

  business?: {
    id: number;
    name: string;
    logoUrl?: string;
  };
};

export type HomeBannersResponse = {
  success: boolean;

  location: {
    city: string;

    district?: string;

    latitude: number;

    longitude: number;
  };

  total: number;

  banners: HomeBanner[];
};
