import {
  ScannerApiResponse,
  ScannerResponse,
} from "@/src/infrastructure/api/scanner/services/scanner.types";

export const mapScannerResponse = (
  response: ScannerApiResponse,
): ScannerResponse => {
  return {
    result: response.data,
  };
};
