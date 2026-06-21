import { ScannerApiResponse, ScannerResponse } from "./scanner.types";

export const mapScannerResponse = (
  response: ScannerApiResponse,
): ScannerResponse => {
  return {
    result: response.data.data,
  };
};
