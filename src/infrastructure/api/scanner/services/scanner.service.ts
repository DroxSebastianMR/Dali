// src/infrastructure/api/scanner/services/scanner.service.ts

import { apiClient } from "@/src/infrastructure/api/client/axios.instance";
import { API_ENDPOINTS } from "@/src/infrastructure/api/endpoints";

import { ScannerApiResponse, ScannerResponse } from "./scanner.types";

import { mapScannerResponse } from "./scanner.mapper";

export const scannerService = {
  analyzeImage: async (image: FormData): Promise<ScannerResponse> => {
    const { data } = await apiClient.post<ScannerApiResponse>(
      API_ENDPOINTS.SCANNER.ANALYZE,
      image,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return mapScannerResponse(data);
  },
};
